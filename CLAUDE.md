# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Shopping List PWA: a shared shopping-list app for members of a household, meant to be opened via an NFC tag (e.g. stuck to the fridge). Monorepo with a Spring Boot backend (`backend/market-app`) and a React + TypeScript frontend (`frontend`). No user accounts/auth in this MVP — a "house" is identified by an `accessCode`, and the frontend just remembers the resulting `houseId` in `localStorage`.

Design docs live in `docs/01-project-overview.md` through `docs/06-deployment.md`. Treat them as a design reference, not ground truth — e.g. `04-api.md` doesn't yet document the pantry-items endpoints that already exist in code, and `06-deployment.md` is currently empty. When in doubt, verify against the actual controllers/entities.

## Commands

### Backend (`backend/market-app`) — Java 21, Spring Boot, Maven

Run from `backend/market-app`:

```
./mvnw spring-boot:run           # run the app (defaults to the "dev" profile)
./mvnw clean install             # full build
./mvnw test                      # run all tests
./mvnw test -Dtest=ClassName#methodName   # run a single test
```

The dev profile (`application-dev.yml`) expects Postgres reachable at `localhost:5432`, db `market_app`, user/password `postgres`/`postgres`. The root `docker-compose.yml` starts exactly that. Note `backend/market-app/compose.yaml` is a separate, unrelated leftover template (different db name/credentials) — use the root compose file for local dev.

Flyway manages the schema (`src/main/resources/db/migration/V{n}__description.sql`); Hibernate `ddl-auto` is `validate`, so entity changes must be accompanied by a new migration, not relied upon to auto-generate DDL.

The "prod" profile reads `DATABASE_URL` / `DATABASE_USERNAME` / `DATABASE_PASSWORD` / `PORT` from the environment.

### Frontend (`frontend`) — React 19, TypeScript, Vite, Tailwind v4

```
npm install
npm run dev         # Vite dev server; proxies /api to http://localhost:8080 (vite.config.ts)
npm run build        # tsc -b && vite build
npm run lint
npm run preview
```

`VITE_API_URL` (set in `.env.development` / `.env.production`, currently `/api/v1`) is the axios base URL. Run backend (port 8080) and frontend dev server together locally — the Vite proxy is what makes `/api` calls reach Spring Boot in dev.

## Architecture

### Backend

Standard layered structure: `controller` → `service` (interface) → `service.impl` → `repository` (Spring Data JPA). Domain entities (`domain/`) all extend `BaseEntity`, which supplies a UUID `id` and `createdAt`/`updatedAt` set via `@PrePersist`/`@PreUpdate`. Request/response shapes live in `dto/request` and `dto/response`; conversion between entities and DTOs is done by MapStruct interfaces in `mapper/` (`@Mapper(componentModel = "spring")`). Domain-specific exceptions in `exception/` are all handled centrally by `GlobalExceptionHandler` (`@RestControllerAdvice`), which returns a single consistent `ErrorResponse` shape (timestamp/status/error/message/details/path) — add new exception types there rather than handling them locally in a controller.

Entity relationships (see `db/migration/V1__create_tables.sql`): `House` 1—N `Product`, `House` 1—N `ShoppingItem`, `House` 1—N `PantryItem`, `Product` 1—N `ShoppingItem`, `Product` 1—N `PantryItem`. `ShoppingItem` uses soft delete (`deletedAt`); normal queries must exclude rows where it's set. `Product.image` is stored as `BYTEA` and served from a dedicated `/image` endpoint as raw bytes rather than embedded in the product JSON.

There's no authentication. A house's `accessCode` is generated through the `AccessCodeGenerator` interface (impl: `RandomAccessCodeGenerator`), retried on creation until unique. Every other endpoint is scoped by `houseId` in the URL path — there's no session/token, so "authorization" is really just "does this record belong to this houseId."

CORS is wide open (`config/CorsConfig`: all origins, `/api/**`) — this is a public MVP without auth, not an oversight to "fix" without asking.

### Frontend

Routing (`router/AppRouter.tsx`) is flat: `/` (`LoginPage`, enter access code), `/house/:houseId` (`HousePage`, shopping list), `/house/:houseId/pantry` (`PantryPage`). There's no route guard — "logged in" is just `hooks/useHouse.ts` checking whether `houseId` exists in `localStorage` (`utils/localStorage.ts`).

No global state library. Each backend resource area has a `services/*Service.ts` wrapping the shared axios instance (`api/axios.ts`, baseURL = `VITE_API_URL`), and pages consume these through small custom hooks (`useHouse`, `useProducts`, `usePantryItems`) plus local component state. TS types under `types/dto/request` and `types/dto/response` mirror the backend DTOs by name/shape — when a backend DTO changes, update its frontend counterpart to match.

Styling mixes Tailwind v4 utility classes with per-component hand-written CSS files (e.g. `ShoppingItemCard.css` next to `ShoppingItemCard.tsx`) — follow whichever pattern the component you're editing already uses rather than converting wholesale.
