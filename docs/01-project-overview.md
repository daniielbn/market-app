# 🛒 Shopping List PWA

> Aplicación web progresiva (PWA) para gestionar listas de la compra compartidas mediante etiquetas NFC.

---

# 📖 Descripción

**Shopping List PWA** es una aplicación web progresiva diseñada para facilitar la gestión de listas de la compra entre los miembros de una misma vivienda.

La aplicación permitirá acceder rápidamente a la lista compartida simplemente escaneando una etiqueta **NFC** colocada, por ejemplo, en la puerta de la nevera.

El objetivo es que añadir un producto a la lista requiera menos de **cinco segundos**, evitando olvidos y haciendo que cualquier miembro de la casa pueda colaborar fácilmente.

---

# 🎯 Objetivos

## Objetivo principal

Desarrollar una aplicación moderna, rápida y sencilla que permita compartir listas de la compra entre varios usuarios.

## Objetivos secundarios

- Crear una aplicación instalable como PWA.
- Aprender y aplicar una arquitectura Full Stack moderna.
- Practicar el desarrollo con Spring Boot y React.
- Implementar un despliegue automatizado en la nube.
- Diseñar una aplicación fácilmente escalable para futuras funcionalidades.

---

# 👥 Público objetivo

La aplicación está orientada principalmente a:

- 🏠 Familias
- ❤️ Parejas
- 🛏️ Pisos compartidos
- 👥 Personas que compartan una lista de la compra

---

# 💡 Problema

En muchas ocasiones un producto se termina y nadie recuerda apuntarlo.

Esto provoca:

- Compras incompletas.
- Productos olvidados.
- Duplicidad de compras.
- Pérdida de tiempo.

La aplicación busca eliminar este problema permitiendo añadir productos de forma inmediata mediante una etiqueta NFC.

---

# ✅ Solución

El usuario únicamente tendrá que:

1. Escanear la pegatina NFC.
2. Introducir el nombre del producto.
3. Pulsar **Añadir**.

En cuestión de segundos el producto estará disponible para el resto de miembros de la vivienda.

---

# ⚙️ Tecnologías

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Progressive Web App (PWA)

## Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Validation
- PostgreSQL
- Flyway

## Infraestructura

- Docker
- Docker Compose
- Railway

## Control de versiones

- Git
- GitHub

---

# 🏗️ Arquitectura

```text
                 ┌──────────────┐
                 │    Usuario   │
                 └──────┬───────┘
                        │
                        ▼
                React + PWA
                        │
                  REST API
                        │
                        ▼
                 Spring Boot
                        │
                        ▼
                  PostgreSQL
```

---

# 🚀 MVP (Producto Mínimo Viable)

La primera versión incluirá únicamente las funcionalidades imprescindibles.

## Funcionalidades

- Crear una lista compartida.
- Añadir productos.
- Marcar productos como comprados.
- Eliminar productos comprados.
- Acceso mediante NFC.
- Instalación como PWA.

---

# ❌ Fuera del alcance (v1)

Las siguientes funcionalidades quedan fuera de la primera versión:

- Sistema de usuarios.
- Autenticación.
- Notificaciones.
- Historial de compras.
- Categorías.
- Favoritos.
- Estadísticas.
- Varias listas por vivienda.

Estas características podrán incorporarse en futuras versiones.

---

# 📈 Evolución prevista

Una vez completado el MVP se podrán añadir funcionalidades como:

- Gestión de usuarios.
- Invitaciones mediante enlace.
- Varias listas.
- Categorías.
- Productos favoritos.
- Escaneo de códigos de barras.
- Sincronización en tiempo real mediante WebSockets.
- Notificaciones Push.
- Estadísticas de consumo.

---

# 📚 Objetivo de aprendizaje

Este proyecto servirá como práctica para afianzar conocimientos en:

- Arquitectura Full Stack.
- Spring Boot.
- React.
- Diseño de APIs REST.
- Bases de datos relacionales.
- Docker.
- Despliegue en Railway.
- Desarrollo de PWAs.
- Integración con etiquetas NFC.

---

# 📌 Estado del proyecto

> 🚧 Proyecto en fase de planificación.

Actualmente se está definiendo la arquitectura, los requisitos funcionales y el diseño general antes de comenzar el desarrollo.