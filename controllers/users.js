const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken"); 
// const nodemailer = require("nodemailer");
const axios = require("axios");
// const { PAGE_URL } = require("../config"); 


usersRouter.post("/", async (request, response) => { 
  // 1. Extrae los datos que vienen del formulario (frontend).
  const { name, email, password } = request.body;
      // ↑ desestructurización ↑
  if (!name || !email || !password) {
  // 2. Validación: Si falta algún campo, detiene todo y avisa.
    return response.status(400).json({ error: "Todos los espacios son requeridos" });
  };
  // 3. Seguridad: Busca si el email ya existe en la base de datos (User.findOne).
  const userExist = await User.findOne({ email });
  if (userExist) {
        return response.status(400).json({ error: "El email ya se encuentra en uso" });
  };
try {
    // --- NUEVA VALIDACIÓN CON API (Sustituye a Nodemailer en Render) ---

// Obtiene la clave secreta desde las variables de entorno (seguridad)
    const API_KEY = process.env.EMAIL_API_KEY; 
// process.env =  es un objeto global de Node.js que nos permite acceder a las variables de entorno


    //  Construye la URL de consulta con la API_KEY y el correo del usuario
    const url = `https://apps.emaillistverify.com/api/verifyEmail?secret=${API_KEY}&email=${email}`;
    console.log("Consultando API para el correo:", email);

    // Axios devuelve un objeto de respuesta y, mediante  destructuring {...}, extrae la propiedad .data, que es donde viene el string con el estado del correo (ok, email_disabled, etc.)
    const { data } = await axios.get(url);
    console.log("Respuesta de la API de verificación:", data);

    //Define como válidos los estados 'ok' (confirmado) y 'ok_for_all' (servidores catch-all)
    const esValido = data === "ok" || data === "ok_for_all";
    //Un servidor Catch-all es aquel que acepta cualquier correo enviado a su dominio, sin confirmar si el buzón específico existe. Ejm: Yahoo utiliza esto y correos de empresas, paraa que sean compatibles con la validaciónd el correo si solo usamos el 'ok' estariamos permitiendo solo los dominio gmail y outlook.


    //Si no es válido, detiene el registro y envía error 400 al frontend
    if (!esValido) {
      return response.status(400).json({ error: "El correo no es válido. Prueba con uno real." });
    };

// 4. Encriptación: bcrypt transforma la contraseña real en un "hash" ilegible.
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 5. Creación: Prepara el nuevo usuario con la contraseña cifrada.
    const newUser = new User({
      name,
      email,
      passwordHash,
      verified: true, // Se marca como verificado automáticamente
    });

// 6.   Guarda el usuario en MongoDB.
    const savedUser = await newUser.save();
console.log("Usuario guardado en MongoDB con ID:", savedUser.id);

/*_____________NODEMAILER______________________*/
  // 7. Token: Crea una "llave" (JWT) que dura 1 día para verificar al usuario.
  // const token = jwt.sign({ id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET, { 
  //  expiresIn: '1d',
// });
// 8. Correo: Configura Nodemailer para usar tu cuenta de Gmail.
//  const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
  
// });
// 9. Envío: Manda el mail con un link que lleva el ID del usuario y el Token.
//    await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: savedUser.email,
//     subject: "Verificación de usuario",
//     html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`,
//   });


// 10. Éxito: Avisa al frontend que todo salió bien.
 return response.status(201).json("Usuario creado." );
   
 } catch (error) {
    console.error("Error capturado en el bloque catch:", error.message);
    return response.status(500).json({ error: "Error en el servidor." });
  }
});
  

/*_____________NODEMAILER______________________*/
/*usersRouter.patch('/:id/:token', async (request, response) => { 
  try {
    // 1. Obtiene el token de la URL.
    const token = request.params.token;
    // 2. Verifica el token: Si el tiempo expiró o es falso, salta al CATCH.
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    // 3. Actualización: Busca al usuario y cambia su estado a 'verified: true'.
    await User.findByIdAndUpdate(id, { verified: true });
    
    // 4. Éxito: Envía el mensaje que leerá el frontend
    return response.status(200).json('Usuario verificado');

  } catch (error) {
    // 5. ERROR (Token expirado): Si entra aquí es porque el link ya no sirve
    const id = request.params.id; // Toma el ID de la URL.
    const user = await User.findById(id); // Busca al usuario.
    const email = user.email;
    // 6. Nuevo Token: Crea una nueva llave que dura solo 1 minuto.
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { 
      expiresIn: '1m'
    });
// 7. Re-envío: Manda un NUEVO correo automáticamente.
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verificación de usuario",
      html: `<a href="${PAGE_URL}/verify/${user.id}/${token}">Verificar correo</a>`,
    });  
// 8. Respuesta: Avisa al frontend que el link viejo murió pero ya mandó otro.
    return response.status(400).json({ error: 'El link ya expiró. Se ha enviado un nuevo link de verificación a tu correo.' });
  }
});*/

module.exports = usersRouter;
