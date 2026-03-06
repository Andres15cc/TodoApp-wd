require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { userExtractor } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



//controllers
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todo');
const logoutRouter = require('./controllers/logout');
const usersRouter = require('./controllers/users');

const app = express();




(async()=> { 

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Rutas frontend
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/todos', express.static(path.resolve('views', 'todos')));
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter)
app.use('/api/todos', userExtractor, todosRouter);




module.exports = app;