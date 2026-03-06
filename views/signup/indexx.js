import { createNotification } from "../components/notification.js";

//Selectores
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const matchInput = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notification = document.querySelector('#notification');

//Regex validation
const NAME_VALIDATION =
  /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1\s]*)$/;
const EMAIL_VALIDATION =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//Validations 
// Variables que guardan el estado de cada input (empiezan en false porque están vacíos)
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
 // Habilita el botón solo si TODAS las validaciones son true
  formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation ? false : true;
// Si el campo está vacío, quita todos los colores de validación
  if (input.value === "") {
    input.classList.remove("outline-red-700", "outline-2", "outline");
    input.classList.remove("outline-green-700", "outline-2", "outline");
    input.classList.add("focus:outline-indigo-700");
  } else if (regexValidation) {
     // Si el texto SÍ cumple pone el borde verde
    input.classList.remove("focus:outline-indigo-700");
    input.classList.add("outline-green-700", "outline-2", "outline");
    input.classList.remove("outline-red-700");
  } else if (!regexValidation) {
    // Si el texto NO cumple, pone el borde rojo
    input.classList.remove("focus:outline-indigo-700");
    input.classList.remove("outline-green-700", "outline-2", "outline");
    input.classList.add("outline-red-700", "outline-2", "outline");
  }
};

//Events
//Escuchan los diferentes inputs al escribirlos y los verifica
nameInput.addEventListener("input", e => {
  nameValidation = NAME_VALIDATION.test(e.target.value);
  validation(nameInput, nameValidation);
});

emailInput.addEventListener("input", e => {
  emailValidation = EMAIL_VALIDATION.test(e.target.value);
  validation(emailInput, emailValidation);
});

passwordInput.addEventListener("input", e => {
  passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
  matchValidation = e.target.value === matchInput.value ;
  validation(passwordInput, passwordValidation);
  validation(matchInput, matchValidation);
});

matchInput.addEventListener("input", e => {
  matchValidation = e.target.value === passwordInput.value ;
  validation(matchInput, matchValidation);
});

form.addEventListener('submit', async e => {
  e.preventDefault(); // Evita que la página se recargue al enviar.
 try{
  // Se crea un objeto con la info de los inputs.
  const newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  // Enviamos el objeto al backend usando AXIOS.
  const { data } = await axios.post('/api/users', newUser);
  // Si sale bien, muestra notificación verde con el mensaje del backend.
  createNotification(false, data);
  // A los 5 segundos, vacía el mensaje.
  setTimeout(() => {
    notification.innerHTML = '';
  }, 5000)

  // Limpia los campos del formulario.
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  matchInput.value = '';
  // Resetea los colores de validación (los pone en neutro).
  validation(nameInput, false);
  validation(emailInput, false);
  validation(passwordInput, false);
  validation(matchInput, false);


} catch (error) {
  // Si el backend da error (ej: email ya usado), muestra notificación roja.
  createNotification(true, error.response.data.error);
  setTimeout(() => {
    // Oculta la notificación a los 5 segundos usando la clase 'hidden'.
    notification.classList.add('hidden');
  }, 5000);

};

});