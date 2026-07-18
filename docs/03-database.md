# 🗄️ Diseño de la Base de Datos

> Documento que describe el modelo de datos de la aplicación, las entidades principales y sus relaciones.

---

# 📖 Introducción

La base de datos ha sido diseñada pensando en la simplicidad del MVP, pero permitiendo la incorporación de nuevas funcionalidades sin necesidad de modificar profundamente la estructura.

Aunque la primera versión será muy sencilla, el modelo permitirá evolucionar hacia una aplicación multiusuario.

---

# 🎯 Objetivos

El modelo de datos debe permitir:

- Gestionar múltiples viviendas.
- Asociar una o varias listas a cada vivienda.
- Gestionar productos dentro de cada lista.
- Escalar fácilmente hacia un sistema de usuarios.

---

# 🏗️ Modelo Entidad-Relación

```text
House
 │
 │ 1
 │
 └─────────────── N
                 │
          ShoppingList
                 │
                 │ 1
                 │
                 └────────────── N
                                │
                         ShoppingItem
```

---

# 📦 Entidades

## 🏠 House

Representa una vivienda.

Cada vivienda posee un código único que será utilizado para acceder desde nuevos dispositivos.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador único |
| name | String | Nombre de la vivienda |
| accessCode | String | PIN o código de acceso |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

---

## 📝 ShoppingList

Representa una lista de compra.

Aunque inicialmente existirá una única lista por vivienda, se ha separado como entidad independiente para permitir varias listas en futuras versiones.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador |
| houseId | UUID | Vivienda propietaria |
| name | String | Nombre de la lista |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

---

## 🛒 ShoppingItem

Representa un producto de la lista.

### Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | UUID | Identificador |
| shoppingListId | UUID | Lista propietaria |
| name | String | Nombre del producto |
| purchased | Boolean | Estado del producto |
| createdAt | Timestamp | Fecha de creación |
| updatedAt | Timestamp | Última modificación |

---

# 🔗 Relaciones

## House → ShoppingList

- Una vivienda puede tener varias listas.
- Cada lista pertenece únicamente a una vivienda.

Relación:

```text
House (1) -------- (N) ShoppingList
```

---

## ShoppingList → ShoppingItem

- Una lista contiene múltiples productos.
- Cada producto pertenece a una única lista.

```text
ShoppingList (1) -------- (N) ShoppingItem
```

---

# 🔑 Claves primarias

Todas las entidades utilizarán:

```text
UUID
```

Motivos:

- No exponen el número real de registros.
- Facilitan futuras integraciones.
- Evitan problemas al sincronizar datos.
- Son la opción habitual en aplicaciones modernas.

---

# 📌 Restricciones

## House

- El nombre será obligatorio.
- El código de acceso será obligatorio.
- El código deberá ser único.

---

## ShoppingList

- El nombre será obligatorio.
- Toda lista deberá pertenecer a una vivienda.

---

## ShoppingItem

- El nombre será obligatorio.
- El estado comprado tendrá como valor inicial `false`.
- Todo producto deberá pertenecer a una lista.

---

# 📈 Escalabilidad

El modelo permite añadir fácilmente:

- Usuarios.
- Miembros de la vivienda.
- Varias listas.
- Categorías.
- Historial.
- Favoritos.
- Notificaciones.

Sin modificar las entidades actuales.

---

# 🚀 Futuras entidades

No formarán parte del MVP, pero el diseño contempla su incorporación.

## User

```text
id
name
email
password
```

---

## HouseMember

```text
houseId
userId
role
joinedAt
```

---

## Category

```text
id
name
icon
color
```

---

## ShoppingHistory

```text
id
shoppingItemId
purchasedAt
purchasedBy
```

---

# 📋 Convenciones

Todas las tablas compartirán las siguientes características:

- Clave primaria UUID.
- Campos `createdAt`.
- Campos `updatedAt`.
- Nombres en singular.
- Relaciones mediante claves foráneas.

---

# 🏁 Conclusión

El modelo propuesto prioriza la simplicidad para el MVP sin renunciar a la escalabilidad.

La separación entre viviendas, listas y productos permitirá ampliar la aplicación en futuras versiones sin realizar cambios estructurales importantes en la base de datos.