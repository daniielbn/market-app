# 🌐 Diseño de la API REST

> Documento que define la API REST de la aplicación, incluyendo los endpoints, métodos HTTP y formato de intercambio de datos.

---

# 📖 Introducción

La comunicación entre el frontend y el backend se realizará mediante una API REST siguiendo buenas prácticas de diseño.

Todos los datos se intercambiarán en formato JSON.

---

# 🎯 Objetivos

La API deberá permitir:

- Gestionar viviendas.
- Gestionar listas de compra.
- Gestionar productos.
- Mantener una estructura sencilla y fácilmente escalable.

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

## Identificación de la vivienda

Una vez que el usuario haya introducido el código de acceso, el frontend lo almacenará localmente y lo enviará en cada petición mediante la siguiente cabecera:

```http
X-House-Code: HOME-7F3K
```

El backend validará dicho código y determinará automáticamente la vivienda asociada.

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
  "id": "uuid",
  "name": "Casa Dani",
  "accessCode": "HOME-7F3K"
}
```

---

## Validar código de acceso

Permite comprobar si el código introducido por el usuario es válido.

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
  "valid": true,
  "houseName": "Casa Dani"
}
```

---

# 📝 Shopping List API

---

## Obtener listas

### Request

```http
GET /api/v1/lists
```

### Headers

```http
X-House-Code: HOME-7F3K
```

### Response

```json
[
  {
    "id": "uuid",
    "name": "Lista principal"
  }
]
```

---

## Crear una lista

### Request

```http
POST /api/v1/lists
```

### Body

```json
{
  "name": "Supermercado"
}
```

---

# 🛒 Shopping Item API

---

## Obtener productos

### Request

```http
GET /api/v1/lists/{listId}/items
```

### Response

```json
[
  {
    "id": "uuid",
    "name": "Leche",
    "purchased": false
  }
]
```

---

## Añadir producto

### Request

```http
POST /api/v1/lists/{listId}/items
```

### Body

```json
{
  "name": "Pan"
}
```

### Response

```json
{
  "id": "uuid",
  "name": "Pan",
  "purchased": false
}
```

---

## Obtener un producto

### Request

```http
GET /api/v1/items/{itemId}
```

---

## Modificar un producto

### Request

```http
PUT /api/v1/items/{itemId}
```

### Body

```json
{
  "name": "Pan Integral",
  "purchased": false
}
```

---

## Marcar como comprado

### Request

```http
PATCH /api/v1/items/{itemId}/purchase
```

### Body

```json
{
  "purchased": true
}
```

---

## Eliminar un producto

### Request

```http
DELETE /api/v1/items/{itemId}
```

---

## Eliminar todos los productos comprados

### Request

```http
DELETE /api/v1/lists/{listId}/items/purchased
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

## ValidateHouseRequest

```json
{
  "accessCode": "HOME-7F3K"
}
```

---

## CreateShoppingListRequest

```json
{
  "name": "Lista principal"
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
  "name": "Leche",
  "purchased": false
}
```

---

# 🚨 Respuestas de error

Todas las respuestas de error seguirán el mismo formato.

Ejemplo:

```json
{
  "timestamp": "2026-07-18T15:42:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Shopping item not found.",
  "path": "/api/v1/items/123"
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
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 🔒 Seguridad

Durante la primera versión:

- No existirá autenticación mediante usuarios.
- El acceso se realizará utilizando el código de la vivienda.
- El backend validará el código recibido en cada petición.

En futuras versiones este mecanismo podrá sustituirse por JWT sin modificar la estructura principal de la API.

---

# 📈 Evolución futura

La API está preparada para incorporar nuevos recursos como:

- Usuarios.
- Miembros de una vivienda.
- Categorías.
- Historial.
- Favoritos.
- Notificaciones.

Sin romper la compatibilidad con la versión actual.

---

# 🏁 Conclusión

La API ha sido diseñada siguiendo principios REST y manteniendo una estructura clara, consistente y fácilmente ampliable.

Su objetivo es ofrecer una base sólida para el desarrollo del backend y facilitar la integración con el frontend React.