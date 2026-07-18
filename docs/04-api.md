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

## Obtener información de una vivienda

### Request

```http
GET /api/v1/houses/{houseId}
```

### Response

```json
{
    "id": "9d4f27d1-65ef-4dd0-9eb8-26dc2b903de0",
    "name": "Casa Dani"
}
```

---

# 🛒 Shopping Item API

---

## Obtener todos los productos

Devuelve todos los productos pertenecientes a una vivienda.

### Request

```http
GET /api/v1/houses/{houseId}/items
```

### Response

```json
[
    {
        "id": "6b5d5ef5-ecf0-4ef7-a2d2-c0dcde70b2a7",
        "name": "Leche",
        "purchased": false
    },
    {
        "id": "2bb5411c-0c62-4703-a7d3-d9f5882d43a5",
        "name": "Pan",
        "purchased": true
    }
]
```

---

## Obtener un producto

### Request

```http
GET /api/v1/houses/{houseId}/items/{itemId}
```

---

## Añadir producto

### Request

```http
POST /api/v1/houses/{houseId}/items
```

### Body

```json
{
    "name": "Café"
}
```

### Response

```json
{
    "id": "2bb5411c-0c62-4703-a7d3-d9f5882d43a5",
    "name": "Café",
    "purchased": false
}
```

---

## Modificar un producto

Permite modificar el nombre del producto.

### Request

```http
PUT /api/v1/houses/{houseId}/items/{itemId}
```

### Body

```json
{
    "name": "Café molido"
}
```

---

## Cambiar estado del producto

Permite marcar o desmarcar un producto como comprado.

### Request

```http
PATCH /api/v1/houses/{houseId}/items/{itemId}/purchase
```

### Body

```json
{
    "purchased": true
}
```

---

## Eliminar un producto

Realiza una eliminación lógica del producto.

### Request

```http
DELETE /api/v1/houses/{houseId}/items/{itemId}
```

### Response

```http
204 No Content
```

---

## Eliminar todos los productos comprados

Elimina lógicamente todos los productos marcados como comprados.

### Request

```http
DELETE /api/v1/houses/{houseId}/items/purchased
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

## CreateShoppingItemRequest

```json
{
    "name": "Leche"
}
```

---

## UpdateShoppingItemRequest

```json
{
    "name": "Leche semidesnatada"
}
```

---

## PurchaseShoppingItemRequest

```json
{
    "purchased": true
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
    "path": "/api/v1/houses/{houseId}/items/{itemId}"
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

La estructura basada en viviendas y productos refleja fielmente el modelo de datos definido y facilita el desarrollo tanto del backend como del frontend.