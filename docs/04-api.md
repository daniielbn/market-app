# 🌐 Diseño de la API REST

> Documento que define la API REST real de la aplicación, con todos los endpoints implementados y los cuerpos que se envían y reciben.

---

# 📖 Introducción

La comunicación entre frontend y backend se realiza mediante una API REST versionada en la URL.

La API actual expone endpoints para:

- Crear y validar viviendas.
- Gestionar productos de una vivienda.
- Gestionar shopping items asociados a productos.

---

# 🎯 Objetivos

La API permite:

- Crear una vivienda y generar su código de acceso.
- Validar el acceso a una vivienda mediante `accessCode`.
- Crear, consultar y eliminar productos.
- Crear, consultar, actualizar y eliminar shopping items.

---

# 📌 Convenciones

## URL base

```text
/api/v1
```

## Formato de datos

- Viviendas y shopping items: `application/json`
- Creación de productos: `multipart/form-data`
- Imagen de producto: `application/octet-stream`

## Identificación de la vivienda

La primera vez que el usuario entra en la aplicación introduce el `accessCode` de su vivienda.

Si el código es válido, el backend devuelve el `houseId` y el frontend lo reutiliza en peticiones posteriores.

---

# 🏠 House API

## 1. Crear una vivienda

```http
POST /api/v1/houses
```

### Request body

```json
{
    "name": "Casa Dani"
}
```

### Response body

```json
{
    "id": "9d4f27d1-65ef-4dd0-9eb8-26dc2b903de0",
    "name": "Casa Dani",
    "accessCode": "HOME-7F3K"
}
```

### Status codes

- `201 Created`
- `400 Bad Request`

---

## 2. Validar código de acceso

```http
POST /api/v1/houses/validate
```

### Request body

```json
{
    "accessCode": "HOME-7F3K"
}
```

### Response body

```json
{
    "houseId": "9d4f27d1-65ef-4dd0-9eb8-26dc2b903de0",
    "houseName": "Casa Dani"
}
```

### Status codes

- `200 OK`
- `400 Bad Request`
- `404 Not Found`

---

# 🛍️ Product API

## 3. Crear un producto

```http
POST /api/v1/houses/{houseId}/products
```

### Path parameters

- `houseId`: identificador de la vivienda.

### Content type

```text
multipart/form-data
```

### Form fields

```text
name=Leche
image=<multipart file>
```

El backend comprueba antes de guardar si ya existe un producto con el mismo nombre en la misma vivienda. Si existe, no lo crea.

### Response body

```json
{
    "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
    "name": "Leche",
    "image": "data:image/png;base64,<base64-image-data>",
    "createdAt": "2026-07-29T10:15:30"
}
```

### Status codes

- `201 Created`
- `400 Bad Request`
- `404 Not Found`
- `409 Conflict`

---

## 4. Obtener todos los productos de una vivienda

```http
GET /api/v1/houses/{houseId}/products
```

### Path parameters

- `houseId`: identificador de la vivienda.

### Response body

```json
[
    {
        "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
        "name": "Leche",
        "image": "data:image/png;base64,<base64-image-data>",
        "createdAt": "2026-07-29T10:15:30"
    }
]
```

### Status codes

- `200 OK`
- `404 Not Found`

---

## 5. Obtener un producto

```http
GET /api/v1/houses/{houseId}/products/{productId}
```

### Path parameters

- `houseId`: identificador de la vivienda.
- `productId`: identificador del producto.

### Response body

```json
{
    "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
    "name": "Leche",
    "image": "data:image/png;base64,<base64-image-data>",
    "createdAt": "2026-07-29T10:15:30"
}
```

### Status codes

- `200 OK`
- `404 Not Found`

---

## 6. Obtener la imagen de un producto

```http
GET /api/v1/houses/{houseId}/products/{productId}/image
```

### Path parameters

- `houseId`: identificador de la vivienda.
- `productId`: identificador del producto.

### Response

```http
200 OK
Content-Type: application/octet-stream
```

### Body

Bytes de la imagen almacenada en la base de datos.

### Status codes

- `200 OK`
- `404 Not Found`

---

## 7. Eliminar un producto

```http
DELETE /api/v1/houses/{houseId}/products/{productId}
```

### Path parameters

- `houseId`: identificador de la vivienda.
- `productId`: identificador del producto.

### Request body

No aplica.

### Response body

No aplica.

### Status codes

- `204 No Content`
- `404 Not Found`

---

# 🛒 Shopping Item API

## 8. Obtener todos los shopping items de una vivienda

```http
GET /api/v1/houses/{houseId}/shopping-items
```

### Path parameters

- `houseId`: identificador de la vivienda.

### Response body

```json
[
    {
        "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
        "product": {
            "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
            "name": "Leche",
            "image": "data:image/png;base64,<base64-image-data>"
        },
        "quantity": 2,
        "purchased": false,
        "comment": "Para desayunos"
    }
]
```

### Notas

- Solo devuelve los shopping items no eliminados lógicamente.
- La respuesta se ordena por fecha de creación ascendente.

### Status codes

- `200 OK`
- `404 Not Found`

---

## 9. Crear un shopping item

```http
POST /api/v1/houses/{houseId}/shopping-items
```

### Path parameters

- `houseId`: identificador de la vivienda.

### Request body

```json
{
    "productId": "0f7c0f1f-3f6f-4c9f-9b63-7cddff9e43b7",
    "quantity": 2,
    "comment": "Para el desayuno"
}
```

### Response body

```json
{
    "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
    "product": {
        "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
        "name": "Leche",
        "image": "data:image/png;base64,<base64-image-data>"
    },
    "quantity": 2,
    "purchased": false,
    "comment": "Para el desayuno"
}
```

### Status codes

- `201 Created`
- `400 Bad Request`
- `404 Not Found`

---

## 10. Actualizar un shopping item

```http
PATCH /api/v1/shopping-items/{shoppingItemId}
```

### Path parameters

- `shoppingItemId`: identificador del shopping item.

### Request body

```json
{
    "quantity": 3,
    "purchased": true,
    "comment": "Ya comprado"
}
```

### Response body

```json
{
    "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
    "product": {
        "id": "3e4a8ed9-2f2f-4d0f-a6ed-9d7b1d2d0e2a",
        "name": "Leche",
        "image": "data:image/png;base64,<base64-image-data>"
    },
    "quantity": 3,
    "purchased": true,
    "comment": "Ya comprado"
}
```

### Notas

- El endpoint admite actualización parcial.
- Solo modifica los campos que vengan informados.

### Status codes

- `200 OK`
- `400 Bad Request`
- `404 Not Found`

---

## 11. Eliminar un shopping item

```http
DELETE /api/v1/houses/{houseId}/shopping-items/{shoppingItemId}
```

### Path parameters

- `houseId`: identificador de la vivienda.
- `shoppingItemId`: identificador del shopping item.

### Request body

No aplica.

### Response body

No aplica.

### Status codes

- `204 No Content`
- `404 Not Found`

### Notas

- El borrado solo afecta al shopping item si pertenece a la vivienda indicada.
- Si el shopping item no existe o no pertenece a esa casa, el backend responde `404 Not Found`.

---

## 12. Eliminar todos los shopping items de una vivienda

```http
DELETE /api/v1/houses/{houseId}/shopping-items
```

### Path parameters

- `houseId`: identificador de la vivienda.

### Request body

No aplica.

### Response body

No aplica.

### Status codes

- `204 No Content`
- `404 Not Found`

---

# 📦 DTOs actuales

## CreateHouseRequest

```json
{
    "name": "Casa Dani"
}
```

## CreateHouseResponse

```json
{
    "id": "uuid",
    "name": "Casa Dani",
    "accessCode": "HOME-7F3K"
}
```

## ValidateHouseRequest

```json
{
    "accessCode": "HOME-7F3K"
}
```

## ValidateHouseResponse

```json
{
    "houseId": "uuid",
    "houseName": "Casa Dani"
}
```

## CreateProductRequest

```text
name=Leche
image=<multipart file>
```

## ProductResponse

```json
{
    "id": "uuid",
    "name": "Leche",
    "image": "data:image/png;base64,<base64-image-data>",
    "createdAt": "2026-07-29T10:15:30"
}
```

## CreateShoppingItemRequest

```json
{
    "productId": "uuid",
    "quantity": 2,
    "comment": "Opcional"
}
```

## UpdateShoppingItemRequest

```json
{
    "quantity": 3,
    "purchased": true,
    "comment": "Opcional"
}
```

## ShoppingItemResponse

```json
{
    "id": "uuid",
    "product": {
        "id": "uuid",
        "name": "Leche",
        "image": "data:image/png;base64,<base64-image-data>"
    },
    "quantity": 2,
    "purchased": false,
    "comment": "Opcional"
}
```

---

# 🚨 Respuestas de error

El backend devuelve el siguiente formato común para errores:

```json
{
    "timestamp": "2026-07-18T18:30:00Z",
    "status": 404,
    "error": "Not Found",
    "message": "Shopping item not found.",
    "details": null,
    "path": "/api/v1/houses/{houseId}/shopping-items/{shoppingItemId}"
}
```

### Validaciones

Cuando falla una validación, `details` contiene la lista de errores de campo:

```json
{
    "details": [
        "name: must not be blank"
    ]
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
| 500 | Internal Server Error |

---

# 🔒 Seguridad

La aplicación no usa autenticación de usuarios todavía.

El acceso a una vivienda se realiza mediante `accessCode`, y el frontend guarda el `houseId` recibido después de validarlo.

---

# 🏁 Conclusión

La API real es más concreta que la descrita inicialmente: tiene 12 endpoints actuales y separa claramente viviendas, productos y shopping items.

Los productos se suben con `multipart/form-data`, su imagen se expone como bytes en un endpoint dedicado y los shopping items trabajan sobre un producto asociado, no sobre un nombre libre.