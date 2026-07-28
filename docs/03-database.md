# 🗄️ Diseño de la Base de Datos

> Documento que describe el modelo de datos real de la aplicación y las tablas que existen actualmente.

---

# 📖 Introducción

La base de datos actual sigue una estructura simple para el MVP, pero ya incluye las tres piezas que utiliza el backend: viviendas, productos y shopping items.

Cada vivienda tiene sus productos propios y los shopping items referencian tanto a la vivienda como al producto asociado. Además, los shopping items usan eliminación lógica.

---

# 🎯 Objetivos

El modelo de datos permite:

- Gestionar múltiples viviendas.
- Asociar productos a una vivienda.
- Crear shopping items a partir de productos concretos.
- Marcar shopping items como comprados.
- Eliminar shopping items sin borrarlos físicamente.

---

# 🏗️ Modelo Entidad-Relación

```text
House
 ├── Product
 └── ShoppingItem
                └── Product
```

Relaciones reales:

```text
House (1) ─────── (N) Product
House (1) ─────── (N) ShoppingItem
Product (1) ───── (N) ShoppingItem
```

---

# 📦 Entidades

## 🏠 House

Representa una vivienda.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| name | String | Nombre de la vivienda |
| accessCode | String | Código de acceso único |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

### Restricciones

- `name` obligatorio, longitud máxima 100.
- `accessCode` obligatorio, único, longitud máxima 20.

---

## 🛍️ Product

Representa un producto asociado a una vivienda.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| houseId | UUID | Vivienda propietaria |
| name | String | Nombre del producto |
| image | byte[] | Imagen del producto |
| imageContentType | String | MIME type de la imagen |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

### Restricciones

- `name` obligatorio.
- `houseId` obligatorio.
- `image` es opcional a nivel de persistencia, aunque la API de creación la exige.

---

## 🛒 ShoppingItem

Representa un producto pendiente o comprado dentro de una vivienda.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| houseId | UUID | Vivienda propietaria |
| productId | UUID | Producto asociado |
| quantity | Integer | Cantidad |
| purchased | Boolean | Estado de compra |
| comment | String | Comentario opcional |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |
| deletedAt | Timestamp | Fecha de eliminación lógica |

### Restricciones

- `quantity` obligatorio y mayor o igual que 1.
- `purchased` obligatorio, con valor inicial `false`.
- `houseId` obligatorio.
- `productId` obligatorio.
- `deletedAt` se usa para soft delete.

---

# 🔗 Relaciones

## House → Product

- Una vivienda puede tener múltiples productos.
- Cada producto pertenece a una sola vivienda.

## House → ShoppingItem

- Una vivienda puede tener múltiples shopping items.
- Cada shopping item pertenece a una sola vivienda.

## Product → ShoppingItem

- Un producto puede estar referenciado por múltiples shopping items.
- Cada shopping item apunta a un único producto.

---

# 🔑 Claves primarias

Todas las tablas usan claves primarias de tipo:

```text
UUID
```

### Motivos

- No exponen el número real de registros.
- Son útiles para integraciones distribuidas.
- Encajan bien con el backend actual basado en JPA/Hibernate.

---

# 📌 Restricciones y comportamiento

## House

- El nombre es obligatorio.
- El código de acceso es obligatorio.
- El código de acceso debe ser único.

## Product

- El nombre es obligatorio.
- Debe pertenecer a una vivienda.
- Si se elimina la vivienda, sus productos se eliminan en cascada.

## ShoppingItem

- Debe pertenecer a una vivienda.
- Debe estar asociado a un producto.
- El estado inicial de `purchased` es siempre `false`.
- La eliminación es lógica mediante `deletedAt`.

---

# 🧹 Eliminación lógica (Soft Delete)

La eliminación lógica solo se aplica a `shopping_items`.

En vez de borrar físicamente el registro, el backend rellena `deleted_at`. Las consultas habituales ignoran los registros con ese campo informado.

---

# 🗃️ Esquema de la base de datos

```text
houses
├── id
├── name
├── access_code
├── created_at
└── updated_at

products
├── id
├── name
├── image
├── image_content_type
├── house_id
├── created_at
└── updated_at

shopping_items
├── id
├── quantity
├── purchased
├── comment
├── deleted_at
├── house_id
├── product_id
├── created_at
└── updated_at
```

---

# 📌 DDL actual

```sql
CREATE TABLE houses (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        access_code VARCHAR(20) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
);

CREATE TABLE products (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image BYTEA,
        image_content_type VARCHAR(100),
        house_id UUID NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        CONSTRAINT fk_products_house
                FOREIGN KEY (house_id)
                REFERENCES houses(id)
                ON DELETE CASCADE
);

CREATE TABLE shopping_items (
        id UUID PRIMARY KEY,
        quantity INTEGER NOT NULL,
        purchased BOOLEAN NOT NULL DEFAULT FALSE,
        comment TEXT,
        deleted_at TIMESTAMP,
        house_id UUID NOT NULL,
        product_id UUID NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        CONSTRAINT fk_shopping_items_house
                FOREIGN KEY (house_id)
                REFERENCES houses(id)
                ON DELETE CASCADE,
        CONSTRAINT fk_shopping_items_product
                FOREIGN KEY (product_id)
                REFERENCES products(id)
                ON DELETE CASCADE
);
```

---

# 🚀 Evolución futura

La base actual todavía no incorpora entidades como `ShoppingList`, `User` o `Member`, pero el esquema ya puede evolucionar hacia una versión más completa sin romper la estructura principal.

---

# 🏁 Conclusión

El modelo real de datos es más completo que el que estaba documentado inicialmente: además de `House` y `ShoppingItem`, existe `Product` como entidad persistente y `ShoppingItem` depende de ella.

La estructura actual prioriza simplicidad, mantiene el MVP funcional y deja espacio para crecer sin rehacer el núcleo del dominio.