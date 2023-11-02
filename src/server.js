const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

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
//Variables globales



//Rutas
app.use(require('./routes/index.routes'));



//Archivos estáticos (static)
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;