const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const exphbs = require('express-handlebars');
const path = require('path');


const { LSC_APP_MONGODB_HOST } = process.env;

//Inicializaciones
const app = express();


//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs')

//Middlewares;
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //interpreta los datos enviados desde un html convirtiéndolos en un objeto
app.use(express.json());


const sessionStore = MongoStore.create({
    mongoUrl: LSC_APP_MONGODB_HOST,
    mongooseConnection: mongoose.connection,
    dbName: 'LSC-app'
});
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 5 * 60 * 1000,
    }
}));

//Variables globales



//Rutas
app.use(require('./routes/index.routes'));



//Archivos estáticos (static)
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;