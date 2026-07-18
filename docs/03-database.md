# 🗄️ Diseño de la Base de Datos

> Documento que describe el modelo de datos de la aplicación, las entidades principales y sus relaciones.

---

# 📖 Introducción

La base de datos ha sido diseñada siguiendo el principio **KISS (Keep It Simple, Stupid)**, priorizando la simplicidad para el MVP sin perder la capacidad de evolucionar en futuras versiones.

En esta primera versión, cada vivienda dispondrá de una única lista de la compra, por lo que no es necesario introducir una entidad intermedia para representar las listas.

Este enfoque reduce la complejidad del modelo de datos y simplifica tanto el backend como el frontend.

---

# 🎯 Objetivos

El modelo de datos debe permitir:

- Gestionar múltiples viviendas.
- Asociar productos a una vivienda.
- Marcar productos como comprados.
- Escalar fácilmente hacia nuevas funcionalidades.

---

# 🏗️ Modelo Entidad-Relación

```text
House
 │
 │ 1
 │
 └─────────────── N
                 │
          ShoppingItem
```

---

# 📦 Entidades

## 🏠 House

Representa una vivienda.

Cada vivienda posee un código único que permitirá a nuevos dispositivos unirse a ella.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| name | String | Nombre de la vivienda |
| accessCode | String | Código de acceso único |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

---

## 🛒 ShoppingItem

Representa un producto pendiente o comprado dentro de una vivienda.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| houseId | UUID | Vivienda propietaria |
| name | String | Nombre del producto |
| purchased | Boolean | Estado del producto |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |
| deletedAt | Timestamp | Fecha de eliminación lógica (Soft Delete) |

---

# 🔗 Relaciones

## House → ShoppingItem

- Una vivienda puede contener múltiples productos.
- Cada producto pertenece únicamente a una vivienda.

```text
House (1) -------- (N) ShoppingItem
```

---

# 🔑 Claves primarias

Todas las entidades utilizarán claves primarias de tipo:

```text
UUID
```

### Motivos

- No exponen el número real de registros.
- Facilitan futuras integraciones.
- Son ideales para aplicaciones distribuidas.
- Son el estándar en muchas aplicaciones modernas.

---

# 📌 Restricciones

## House

- El nombre será obligatorio.
- El código de acceso será obligatorio.
- El código de acceso deberá ser único.

---

## ShoppingItem

- El nombre será obligatorio.
- Todo producto deberá pertenecer a una vivienda.
- El estado inicial será siempre `false` (pendiente).
- Los productos eliminados utilizarán eliminación lógica (`deletedAt`).

---

# 🧹 Eliminación lógica (Soft Delete)

En lugar de eliminar físicamente un producto de la base de datos, se marcará mediante el campo:

```text
deletedAt
```

Esto permitirá en futuras versiones:

- Recuperar productos eliminados.
- Implementar historial.
- Obtener estadísticas.
- Auditar cambios.

Las consultas normales ignorarán automáticamente aquellos registros cuyo `deletedAt` no sea nulo.

---

# 📈 Escalabilidad

El modelo ha sido diseñado para facilitar la incorporación de nuevas funcionalidades sin modificar las entidades existentes.

Entre ellas:

- Sistema de usuarios.
- Miembros de una vivienda.
- Varias listas de compra.
- Categorías.
- Historial.
- Favoritos.
- Notificaciones.

---

# 🚀 Evolución futura

Cuando la aplicación permita gestionar varias listas por vivienda, se añadirá una nueva entidad:

```text
ShoppingList
```

quedando el modelo de la siguiente manera:

```text
House
 │
 └── ShoppingList
         │
         └── ShoppingItem
```

Los productos existentes podrán migrarse automáticamente a una lista denominada **"Lista principal"**, sin afectar a los usuarios.

---

# 📋 Convenciones

Todas las tablas seguirán las siguientes normas:

- Clave primaria UUID.
- Campos `createdAt` y `updatedAt`.
- Nombres de entidades en singular.
- Relaciones mediante claves foráneas.
- Eliminación lógica cuando sea necesario.

---

# 🗃️ Esquema de la base de datos

```text
House
│
├── id
├── name
├── accessCode
├── createdAt
└── updatedAt

        │
        │ 1
        │
        ▼

ShoppingItem
├── id
├── houseId
├── name
├── purchased
├── createdAt
├── updatedAt
└── deletedAt
```

---

# 📌 Decisiones de diseño

Durante la fase de análisis se decidió no incorporar una entidad `ShoppingList` en el MVP.

Aunque inicialmente estaba contemplada, se concluyó que añadiría una complejidad innecesaria para una aplicación donde cada vivienda únicamente dispone de una lista de la compra.

Esta decisión aporta varias ventajas:

- Modelo de datos más sencillo.
- Menor número de relaciones.
- Consultas SQL más simples.
- API REST más limpia.
- Backend menos complejo.
- Frontend más fácil de mantener.

La arquitectura sigue preparada para incorporar múltiples listas en futuras versiones mediante una migración de base de datos.

---

# 🏁 Conclusión

El modelo de datos prioriza la simplicidad, el rendimiento y la mantenibilidad.

Se ha diseñado un esquema mínimo que cubre todas las necesidades del MVP y que, al mismo tiempo, permite evolucionar hacia una aplicación mucho más completa sin requerir cambios drásticos en la arquitectura.