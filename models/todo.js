// Importar las dependencias necesarias
const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');



const todoSchema = new mongoose.Schema({
    text: String,
    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  
});

// Método para verificar el token de acceso
todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        returnedObject.__v = undefined;
       
    }
});


const Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo;