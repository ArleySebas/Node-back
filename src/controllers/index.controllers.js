const Formulario = require('../models/Formulario');
const { enviarMail } = require('../helpers/Enviar-emails');


const indexCtrl = {};
const usuarios = {};


//  Home  //

indexCtrl.renderHome = (req, res) => {
    const loader = {loader: true};
    res.render('home', loader);
};


//  Cambiar clave  //

indexCtrl.renderClave = (req, res) => {
    res.render('clave');
};


//  Nuevo usuario registrado  //

indexCtrl.createNewUser = async (req, res) => {

    try {

        const { nombre, documento, programa } = req.body;

        const newFormulario = new Formulario({nombre, documento, programa});

        const savedFormulario = await newFormulario.save(); //const newFormulzario = await Formulario.

        const usuario = savedFormulario._id; 
        req.session.usuarioId = usuario;
        req.session.tiempoSesion = new Date().getTime();

        res.redirect('/Servicios');
    } catch (error) {
        res.redirect('/')
    }
};


//  Render Servicios  //

indexCtrl.renderServicios = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectHome:true, loader: true}
    res.render('servicios', mostrar);
};

// Render servicios específicos //

indexCtrl.renderExamenes = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true, loader: true};
    res.render('examenes', mostrar);
};

indexCtrl.renderCertificados = (req, res) =>{
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true, loader: true};
    res.render('certificados', mostrar);
};

indexCtrl.renderDerechos = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true, loader:true};
    res.render('derechos', mostrar);
};

indexCtrl.renderConstancias = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true, loader: true};
    res.render('constancias', mostrar);
};

indexCtrl.renderOtros = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true, loader: true};
    res.render('otros', mostrar);
};

//  Procesar selección hecha por usuario  //

indexCtrl.userSelection = async (req, res) => {
    
    try{

        const { servicio } = req.body;

        const date = new Date();
        const tiempoFinal = date.getTime();
        const tiempoSolicitud = (tiempoFinal - req.session.tiempoSesion) / 1000;

        const options = { timeZone: 'America/Bogota', 'hour12': false };
        const fechaActual = date.toLocaleString('es-CO', options).split(',')[0];
        const horaActual = date.toLocaleString('es-CO', options).split(',')[1];
        const fechaYhora = `${horaActual} ${fechaActual}`;

        const newSelection = await Formulario.findById(req.session.usuarioId);

        newSelection.servicio = servicio;
        newSelection.fechaYhora = fechaYhora;
        newSelection.tiempoSolicitud = tiempoSolicitud;
        await newSelection.save();

        const subject = `LSC admisiones solicitud hora ${horaActual} y fecha ${fechaActual}`;
        const text = `El estudiante: ${newSelection.nombre}, con documento/carné: ${newSelection.documento}, en el programa: ${newSelection.programa}, hace una solicitud de --- ${newSelection.servicio} ---`;
        enviarMail(subject, text);

        res.json({resumen_url:'/Resumen'});

    } catch (error) {
        delete req.session.tiempoSesion;
        req.session.destroy();
        res.redirect('/');
    };
};

//  Obtener la solicitud completa  //

indexCtrl.resumenSolicitud = async (req, res) => {
    const Resumen = await Formulario.findById(req.session.usuarioId);
    res.json({Resumen});
};

//  Render resumen  //

indexCtrl.renderResumen = (req, res) => {
    res.render('resumen');
};

//  Render Encuesta  //

indexCtrl.renderEncuesta = (req, res) => {
    const loader = {loader: true};
    res.render('encuesta', loader);
};

//  Procesar encuesta en BD  //

indexCtrl.procesarEncuesta = async (req, res) => {

    try {
    
        const { 0:encuesta_1, 1:encuesta_Extra, 2:encuesta_2, 3:encuesta_3 } = req.body; //desestructuración de objetos
        
        const date = new Date();
        const tiempoFinalSesion = date.getTime();
        const tiempoSesionTotal = (tiempoFinalSesion - req.session.tiempoSesion) / 1000;

        const newSelection = await Formulario.findById(req.session.usuarioId);

        if (!newSelection) {
            delete req.session.tiempoSesion;
            req.session.destroy();
            res.redirect('/');
            return;
        } else {
            newSelection.encuesta1 = encuesta_1;
            newSelection.encuestaExtra = encuesta_Extra;
            newSelection.encuesta2 = encuesta_2;
            newSelection.encuesta3 = encuesta_3;
            newSelection.tiempoSesionTotal = tiempoSesionTotal;
            await newSelection.save();

            delete req.session.tiempoSesion;
            req.session.destroy();
            res.json({redireccion_url:'/'});
        }

    } catch (error) {
        delete req.session.tiempoSesion;
        req.session.destroy();
        res.redirect('/');
        return;
    }
};

module.exports = indexCtrl;