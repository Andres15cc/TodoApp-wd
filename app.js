require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');



const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todo');
const { userExtractor } = require('./middleware/auth');


// Rutas
app.use('/api/login', loginRouter);

module.exports = app;

(async()=> { 

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();


//Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/todos', express.static(path.resolve('views', 'todos')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));


//Rutas backend


app.use('/api/login', loginRouter);
app.use('/api/todos', todosRouter);





module.exports = app;