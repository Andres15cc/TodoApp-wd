
# 📝 TodoApp - Gestor de Tareas Full-Stack
[![Deploy on Render](https://img.shields.io/badge/Render-%23430098.svg?style=for-the-badge&logo=render&logoColor=white)](https://todoapp-wd.onrender.com)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

TodoApp es una aplicación web profesional diseñada para la gestión de tareas personales. Implementa un flujo completo de autenticación, seguridad avanzada y una arquitectura limpia siguiendo el patrón **MVC** (Modelo-Vista-Controlador).

## 🚀 Características Principales

* 🔐 **Autenticación de Nivel Profesional**: Registro de usuarios con encriptación de contraseñas mediante **Bcrypt**.
* 📧 **Verificación de Cuentas**: Validación de correos electrónicos en tiempo real mediante la API de **EmailListVerify** para asegurar cuentas reales.
* 🎟️ **Sesiones Seguras**: Uso de **JSON Web Tokens (JWT)** almacenados en cookies `httpOnly` para prevenir ataques XSS.
* ✅ **Gestión CRUD Completa**: Interfaz fluida para crear, listar, marcar como completadas y eliminar tareas.
* 🎨 **UI/UX Responsiva**: Diseño moderno, minimalista y optimizado para dispositivos móviles utilizando **Tailwind CSS**.
* 🔄 **Navegación Dinámica**: Sistema de navegación inteligente basado en el estado de la sesión y la ubicación del usuario.

## 🛠️ Tecnologías Utilizadas

### Backend
* **Node.js & Express**: Motor de servidor y manejo de rutas robusto.
* **MongoDB & Mongoose**: Base de datos NoSQL y modelado de esquemas eficiente.
* **Bcrypt**: Hashing de contraseñas para garantizar la privacidad de los datos.
* **JWT & Cookie-parser**: Gestión de identidad y persistencia de sesión segura.
* **Axios**: Cliente HTTP para integración con APIs externas de verificación.

### Frontend
* **JavaScript Vanilla (ES6+)**: Lógica dinámica, manipulación avanzada del DOM y manejo de estados.
* **Tailwind CSS**: Estilizado moderno mediante clases de utilidad y diseño responsivo.

## 📂 Estructura del Proyecto

```text
├── controllers/    # Lógica de negocio: Métodos CRUD y Auth
├── middleware/     # Filtros de seguridad y protección de rutas con JWT
├── models/         # Definición de esquemas de base de datos (User, Todo)
├── views/          # Frontend: HTML, lógica de cliente y componentes dinámicos
├── app.js          # Configuración de Express y Middlewares globales
├── config.js       # Variables de configuración y conexión a DB
├── index.js        # Punto de entrada principal (Server Start)
└── .env            # Variables de entorno (Claves de API y Secretos)
```
## 🔌 API Endpoints (Resumen)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/users` | Registro de nuevo usuario | Público |
| **POST** | `/api/login` | Autenticación y generación de JWT | Público |
| **GET** | `/api/logout` | Limpieza de cookies y cierre de sesión | Privado |
| **GET** | `/api/todos` | Obtener todas las tareas del usuario | Privado (JWT) |
| **POST** | `/api/todos` | Crear una nueva tarea | Privado (JWT) |


## ⚙️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https:https: //github.com/delgadillow79-star/TodoApp-wd.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz con:
   ```env
   MONGO_URI=tu_conexion_mongodb
   ACCESS_TOKEN_SECRET=tu_secreto_super_seguro
   EMAIL_API_KEY=tu_api_key_de_emaillistverify
   ```
4. **Iniciar el servidor:**
   
   MODO DESARROLLO/TEST: Nodemon
   ```bash 
   npm run dev
   ```
   MODO PRODUCCIÓN: Render
   ```bash 
   npm run start
   ```

## 👥 Autores

* [**William Delgadillo**](https://github.com/delgadillow79-star) 
* [**Andres Contreras**](https://github.com/Andres15cc)
* [**Leandra Yanes**](https://github.com/leandrayanesdeveloper)


---

