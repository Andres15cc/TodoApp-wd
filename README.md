# 📝 TodoApp - Gestor de Tareas Full-Stack

TodoApp es una aplicación web profesional diseñada para la gestión de tareas personales. Implementa un flujo completo de autenticación, seguridad avanzada y una arquitectura limpia siguiendo el patrón **MVC** (Modelo-Vista-Controlador).

---

## 🚀 Características Principales

* 🔐 **Autenticación de Nivel Profesional**: Registro de usuarios con encriptación de contraseñas mediante **Bcrypt**.
* 📧 **Verificación de Cuentas**: Sistema de confirmación por correo electrónico utilizando **Nodemailer**.
* 🎟️ **Sesiones Seguras**: Uso de **JSON Web Tokens (JWT)** almacenados en cookies `httpOnly` para prevenir ataques XSS.
* ✅ **Gestión CRUD Completa**: Interfaz fluida para crear, listar, marcar como completadas y eliminar tareas.
* 🎨 **UI/UX Responsiva**: Diseño moderno y optimizado para dispositivos móviles utilizando **Tailwind CSS**.

---

## 🛠️ Tecnologías Utilizadas

### Backend
* **Node.js & Express**: Motor de servidor y manejo de rutas.
* **MongoDB & Mongoose**: Base de datos NoSQL y modelado de esquemas.
* **Bcrypt**: Hashing de contraseñas para máxima seguridad.
* **JWT**: Generación de tokens de identidad.
* **Cookie-parser**: Gestión de cookies seguras en el navegador.
* **Nodemailer**: Automatización de correos transaccionales.

### Frontend
* **JavaScript Vanilla**: Lógica dinámica y manipulación del DOM.
* **Tailwind CSS**: Estilizado mediante clases de utilidad.
* **Axios**: Comunicación eficiente con la API.

---

## 📂 Estructura del Proyecto



├── controllers/    # Cerebro del proyecto: métodos CRUD y lógica de rutas
├── img/            # Assets y recursos visuales
├── middleware/     # Filtros de seguridad y protección de rutas con JWT
├── models/         # Definición de esquemas de base de datos (User, Todo)
├── views/          # Frontend: HTML, lógica de cliente y componentes
├── app.js          # Configuración de Express y Middlewares
├── config.js       # Variables de configuración global
├── index.js        # Punto de entrada principal (Server start)
├── tailwind.config.js # Configuración personalizada de estilos
└── .env            # Variables de entorno (No incluido en el repo)


Autenticación


POST /api/users - Registrar nuevo usuario
POST /api/login - Iniciar sesión
GET /api/logout - Cerrar sesión
PATCH /api/users/:id/:token - Verificar email



## Autores
[William Delgadillo] 
[Andres Contreras] 
[leandra Yanez] 