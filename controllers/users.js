const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PAGE_URL } = require("../config");


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
// 4. Encriptación: bcrypt transforma la contraseña real en un "hash" ilegible.
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
// 5. Creación: Prepara el nuevo usuario con la contraseña cifrada.
  const newUser = new User({
    name,
    email,
    passwordHash,
  });
// 6. Guardado: Guarda el usuario en MongoDB.
  const savedUser = await newUser.save();
  // 7. Token: Crea una "llave" (JWT) que dura 1 día para verificar al usuario.
  const token = jwt.sign({ id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET, { 
   expiresIn: '1d',
});
// 8. Correo: Configura Nodemailer para usar tu cuenta de Gmail.
 const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
});
// 9. Envío: Manda el mail con un link que lleva el ID del usuario y el Token.
   await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: savedUser.email,
    subject: "Verificación de usuario",
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`,
  });
// 10. Éxito: Avisa al frontend que todo salió bien.
 return response.status(201).json("Usuario creado. Por favor, verifica tu  correo." );
   
  
});

usersRouter.patch('/:id/:token', async (request, response) => { 
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
});

module.exports = usersRouter;
