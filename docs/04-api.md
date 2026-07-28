# 🌐 Diseño de la API REST

> Documento que define la API REST de la aplicación, incluyendo los recursos, endpoints, métodos HTTP y formato de intercambio de datos.

---

# 📖 Introducción

La comunicación entre el frontend y el backend se realizará mediante una API REST siguiendo buenas prácticas de diseño.

Todos los datos se intercambiarán en formato **JSON** y la API estará versionada para facilitar futuras evoluciones sin romper la compatibilidad.

---

# 🎯 Objetivos

La API deberá permitir:

- Gestionar viviendas.
- Validar el acceso a una vivienda.
- Gestionar los productos de una vivienda.
- Mantener una estructura sencilla, intuitiva y escalable.

---

# 📌 Convenciones

## URL base

```text
/api/v1
```

---

## Formato de datos

Todas las peticiones y respuestas utilizarán:

```http
Content-Type: application/json
```

---

## Versionado

La API utilizará versionado mediante la URL.

Ejemplo:

```text
/api/v1/...
```

---

## Identificación de la vivienda

La primera vez que el usuario abra la aplicación deberá introducir el código de acceso de su vivienda.

Una vez validado, el backend devolverá el identificador (`houseId`) de la vivienda.

El frontend almacenará dicho identificador localmente para utilizarlo en las siguientes peticiones.

## Formato por recurso

- Viviendas y shopping items: `application/json`
- Creación de productos: `multipart/form-data`
- Descarga de imagen de producto: `application/octet-stream`

---

# 🏠 House API

---

## Crear una vivienda

### Request

```http
POST /api/v1/houses
```

### Body

```json
{
    "name": "Casa Dani"
}
```

### Response

```json
{
    "id": "9d4f27d1-65ef-4dd0-9eb8-26dc2b903de0",
    "name": "Casa Dani",
    "accessCode": "HOME-7F3K"
}
```

---

## Validar código de acceso

Permite comprobar si el código introducido es válido.

### Request

```http
POST /api/v1/houses/validate
```

### Body

```json
{
    "accessCode": "HOME-7F3K"
}
```

### Response

```json
{
    "houseId": "9d4f27d1-65ef-4dd0-9eb8-26dc2b903de0",
    "houseName": "Casa Dani"
}
```

---

## Shopping Item API

---

## Obtener todos los shopping items de una vivienda

### Request

```http
GET /api/v1/houses/{houseId}/shopping-items
```

### Response

```json
[
    {
        "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
        "quantity": 2,
        "purchased": false,
        "comment": "Para desayunos"
    }
]
```

---

## Crear un shopping item

### Request

```http
POST /api/v1/houses/{houseId}/shopping-items
```

### Body

```json
{
    "productId": "0f7c0f1f-3f6f-4c9f-9b63-7cddff9e43b7",
    "quantity": 2,
    "comment": "Para el desayuno"
}
```

### Response

```json
{
    "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
    "quantity": 2,
    "purchased": false,
    "comment": "Para el desayuno"
}
```

---

## Actualizar un shopping item

### Request

```http
PATCH /api/v1/shopping-items/{shoppingItemId}
```

### Body

```json
{
    "quantity": 3,
    "purchased": true,
    "comment": "Ya comprado"
}
```

### Response

```json
{
    "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
    "quantity": 3,
    "purchased": true,
    "comment": "Ya comprado"
}
```

---

## Eliminar un shopping item

### Request

```http
DELETE /api/v1/shopping-items/{shoppingItemId}
```

### Response

```http
204 No Content
```

---

## Eliminar todos los shopping items de una vivienda

### Request

```http
DELETE /api/v1/houses/{houseId}/shopping-items
```

### Response

```http
204 No Content
```

---

# 🛍️ Product API

---

## Crear un producto

La subida de imagen se hace con `multipart/form-data`.

### Request

```http
POST /api/v1/houses/{houseId}/products
```

### Form fields

```text
name=Leche
image=<multipart file>
```

### Response

```json
{
    "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
    "name": "Leche",
    "image": "<base64-image-data>"
}
```

---

## Obtener todos los productos de una vivienda

### Request

```http
GET /api/v1/houses/{houseId}/products
```

### Response

```json
[
    {
        "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
        "name": "Leche",
        "image": "<base64-image-data>"
    }
]
```

---

## Obtener un producto

### Request

```http
GET /api/v1/houses/{houseId}/products/{productId}
```

### Response

```json
{
    "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
    "name": "Leche",
    "image": "<base64-image-data>"
}
```

---

## Obtener la imagen de un producto

### Request

```http
GET /api/v1/houses/{houseId}/products/{productId}/image
```

### Response

```http
200 OK
Content-Type: application/octet-stream
```

---

## Eliminar un producto

### Request

```http
DELETE /api/v1/houses/{houseId}/products/{productId}
```

### Response

```http
204 No Content
```

---

# 📦 DTOs

## CreateHouseRequest

```json
{
    "name": "Casa Dani"
}
```

---

## CreateHouseResponse

```json
{
    "id": "uuid",
    "name": "Casa Dani",
    "accessCode": "HOME-7F3K"
}
```

---

## ValidateHouseRequest

```json
{
    "accessCode": "HOME-7F3K"
}
```

---

## ValidateHouseResponse

```json
{
    "houseId": "uuid",
    "houseName": "Casa Dani"
}
```

---

## CreateProductRequest

```text
name=Leche
image=<multipart file>
```

---

## ProductResponse

```json
{
    "id": "uuid",
    "name": "Leche",
    "image": "<base64-image-data>"
}
```

---

## CreateShoppingItemRequest

```json
{
    "productId": "uuid",
    "quantity": 2,
    "comment": "Opcional"
}
```

---

## UpdateShoppingItemRequest

```json
{
    "quantity": 3,
    "purchased": true,
    "comment": "Opcional"
}
```

---

## ShoppingItemResponse

```json
{
    "id": "uuid",
    "quantity": 2,
    "purchased": false,
    "comment": "Opcional"
}
```

---

# 🚨 Respuestas de error

Todas las respuestas de error seguirán un formato común.

```json
{
    "timestamp": "2026-07-18T18:30:00Z",
    "status": 404,
    "error": "Not Found",
    "message": "Shopping item not found.",
    "path": "/api/v1/houses/{houseId}/shopping-items/{shoppingItemId}"
}
```

---

# 📋 Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 🔒 Seguridad

La primera versión de la aplicación no dispondrá de autenticación mediante usuarios.

El acceso a una vivienda se realizará utilizando un código único (`accessCode`).

Una vez validado, el frontend almacenará el identificador (`houseId`) para acceder a los recursos asociados a dicha vivienda.

En futuras versiones, este mecanismo podrá sustituirse por autenticación basada en JWT sin modificar la estructura general de la API.

---

# 📈 Evolución futura

La API está preparada para incorporar nuevos recursos como:

- Usuarios.
- Miembros de una vivienda.
- Categorías.
- Historial de compras.
- Notificaciones.
- Favoritos.

Manteniendo la compatibilidad con la versión actual.

---

# 🏁 Conclusión

La API ha sido diseñada siguiendo principios REST, priorizando la simplicidad para el MVP y permitiendo evolucionar fácilmente hacia una aplicación más completa.

La estructura basada en viviendas, productos y shopping items refleja fielmente el modelo de datos definido y facilita el desarrollo tanto del backend como del frontend.