# 📋 Requisitos Funcionales

> Documento que define los requisitos funcionales y no funcionales de la aplicación.

---

# 📖 Introducción

Este documento recoge las funcionalidades que deberá cumplir la aplicación durante su desarrollo.

Los requisitos definidos aquí servirán como base para el diseño de la base de datos, la API REST y la interfaz de usuario.

---

# 🎯 Objetivo

Desarrollar una aplicación web progresiva (PWA) que permita compartir listas de la compra de forma rápida y sencilla entre los miembros de una vivienda mediante el uso de etiquetas NFC.

---

# 👤 Actores

## Miembro de la vivienda

Usuario que puede acceder a la lista compartida para:

- Consultar los productos pendientes.
- Añadir nuevos productos.
- Marcar productos como comprados.
- Eliminar productos comprados.

---

# ✅ Requisitos Funcionales

## RF-01 · Acceder a la lista mediante NFC

**Descripción**

El usuario podrá acceder directamente a la aplicación escaneando una etiqueta NFC.

**Prioridad**

🔴 Alta

---

## RF-02 · Visualizar la lista de la compra

**Descripción**

La aplicación deberá mostrar todos los productos pendientes de compra.

**Prioridad**

🔴 Alta

---

## RF-03 · Añadir un producto

**Descripción**

El usuario podrá añadir un nuevo producto a la lista.

**Condiciones**

- El nombre será obligatorio.
- No se permitirán nombres vacíos.
- El producto se añadirá automáticamente como pendiente.

**Prioridad**

🔴 Alta

---

## RF-04 · Marcar un producto como comprado

**Descripción**

El usuario podrá cambiar el estado de un producto entre:

- Pendiente
- Comprado

**Prioridad**

🔴 Alta

---

## RF-05 · Eliminar productos comprados

**Descripción**

La aplicación permitirá eliminar todos los productos marcados como comprados mediante una única acción.

**Prioridad**

🟠 Media

---

## RF-06 · Actualización automática de la lista

**Descripción**

Todos los usuarios deberán visualizar la información más reciente.

> En la primera versión esta actualización se realizará al recargar la aplicación.

> En versiones futuras se implementará sincronización en tiempo real mediante WebSockets.

**Prioridad**

🟡 Baja

---

## RF-07 · Instalación como PWA

**Descripción**

La aplicación deberá poder instalarse como una aplicación nativa tanto en Android como en iOS.

**Prioridad**

🟠 Media

---

# 🚫 Requisitos fuera del alcance (v1)

Las siguientes funcionalidades quedan descartadas para la primera versión.

- Sistema de autenticación.
- Registro de usuarios.
- Varias listas por vivienda.
- Categorías de productos.
- Productos favoritos.
- Historial de compras.
- Notificaciones Push.
- Estadísticas.
- Escaneo de códigos de barras.

---

# 📖 Historias de Usuario

---

## HU-01

**Como** miembro de la vivienda

**Quiero** acceder rápidamente a la lista mediante una etiqueta NFC

**Para** añadir un producto en pocos segundos.

---

## HU-02

**Como** miembro de la vivienda

**Quiero** visualizar todos los productos pendientes

**Para** saber qué debo comprar.

---

## HU-03

**Como** miembro de la vivienda

**Quiero** añadir un producto

**Para** que el resto de personas sepan que hace falta comprarlo.

---

## HU-04

**Como** miembro de la vivienda

**Quiero** marcar un producto como comprado

**Para** indicar que ya se ha adquirido.

---

## HU-05

**Como** miembro de la vivienda

**Quiero** eliminar todos los productos comprados

**Para** mantener la lista limpia.

---

# ⚙️ Requisitos No Funcionales

## RNF-01 · Facilidad de uso

La aplicación deberá permitir añadir un producto en menos de **cinco segundos**.

---

## RNF-02 · Responsive

La interfaz deberá adaptarse correctamente a dispositivos móviles y escritorio.

---

## RNF-03 · Disponibilidad

La aplicación deberá estar disponible las 24 horas del día mediante su despliegue en Railway.

---

## RNF-04 · Rendimiento

La aplicación deberá cargar en menos de **dos segundos** en condiciones normales de conexión.

---

## RNF-05 · Escalabilidad

La arquitectura deberá permitir incorporar nuevas funcionalidades sin necesidad de rehacer la aplicación.

---

## RNF-06 · Mantenibilidad

El código deberá seguir una arquitectura por capas y buenas prácticas de desarrollo.

---

# 🎯 Criterios de aceptación

La primera versión del proyecto se considerará completada cuando se puedan realizar las siguientes acciones:

- ✅ Acceder a la aplicación mediante una etiqueta NFC.
- ✅ Consultar la lista compartida.
- ✅ Añadir productos.
- ✅ Marcar productos como comprados.
- ✅ Eliminar productos comprados.
- ✅ Instalar la aplicación como PWA.
- ✅ Desplegar la aplicación en Railway.

---

# 🗺️ Roadmap funcional

## Versión 1.0

- Lista compartida.
- Añadir productos.
- Marcar productos.
- Eliminar productos comprados.
- PWA.
- NFC.

---

## Versión 2.0

- Sistema de usuarios.
- Gestión de viviendas.
- Varias listas.
- Categorías.
- Historial.

---

## Versión 3.0

- WebSockets.
- Notificaciones Push.
- Escaneo de códigos de barras.
- Estadísticas.
- Productos favoritos.

---

# 📌 Conclusión

La primera versión de la aplicación se centrará exclusivamente en ofrecer una experiencia rápida, sencilla y eficiente para gestionar una lista de la compra compartida.

Cualquier funcionalidad que no aporte valor directo al objetivo principal quedará aplazada para futuras versiones.