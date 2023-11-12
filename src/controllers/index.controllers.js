const Formulario = require('../models/Formulario');
const { enviarMail } = require('../helpers/Enviar-emails');


const indexCtrl = {};
const usuarios = {};


//  Home  //

indexCtrl.renderHome = (req, res) => {
    res.render('home');
};


//  Cambiar clave  //

indexCtrl.renderClave = (req, res) => {
    res.render('clave');
}


//  Nuevo usuario registrado  //

indexCtrl.createNewUser = async (req, res) => {

    const { nombre, documento, programa } = req.body;

    const newFormulario = new Formulario({nombre, documento, programa});

    const savedFormulario = await newFormulario.save(); //const newFormulzario = await Formulario.

    const usuario = savedFormulario._id; 
    req.session.usuarioId = usuario;
    req.session.tiempoSesion = new Date().getTime();

    res.redirect('/Servicios');
}


//  Render Servicios  //

indexCtrl.renderServicios = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectHome:true}
    res.render('servicios', mostrar);
};

// Render servicios específicos //

indexCtrl.renderExamenes = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('examenes', mostrar);
};

indexCtrl.renderCertificados = (req, res) =>{
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('certificados', mostrar);
};

indexCtrl.renderDerechos = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('derechos', mostrar);
}

indexCtrl.renderConstancias = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('constancias', mostrar);
};

indexCtrl.renderOtros = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('otros', mostrar);
};

//  Procesar selección hecha por usuario  //

indexCtrl.userSelection = async (req, res) => {
   
    const { servicio } = req.body;

    const date = new Date();
    const tiempoFinal = date.getTime();
    const tiempoSolicitud = (tiempoFinal - req.session.tiempoSesion) / 1000;

    const options = { timeZone: 'America/Bogota', 'hour12': false };
    const fechaActual = date.toLocaleString('es-CO', options).split(',')[0];
    const horaActual = date.toLocaleString('es-CO', options).split(',')[1];
    const fechaYhora = `hora ${horaActual} y fecha ${fechaActual}`;

    const newSelection = await Formulario.findById(req.session.usuarioId);
    newSelection.servicio = servicio;
    newSelection.fechaYhora = fechaYhora;
    newSelection.tiempoSolicitud = tiempoSolicitud;
    await newSelection.save();

    const subject = `LSC admisiones solicitud ${newSelection.fechaYhora}`;
    const text = `El estudiante: ${newSelection.nombre}, con documento/carné: ${newSelection.documento}, en el programa: ${newSelection.programa}, hace una solicitud de --- ${newSelection.servicio} ---`;
    enviarMail(subject, text);

    res.json({resumen_url:'/Resumen'});
}

//  Obtener la solicitud completa  //

indexCtrl.resumenSolicitud = async (req, res) => {
    const Resumen = await Formulario.findById(req.session.usuarioId);
    res.json({Resumen});
}

//  Render resumen  //

indexCtrl.renderResumen = (req, res) => {
    res.render('resumen');
}

//  Render Encuesta  //

indexCtrl.renderEncuesta = (req, res) => {
    res.render('encuesta');
};

//  Procesar encuesta en BD  //

indexCtrl.procesarEncuesta = async (req, res) => {
    const { 0:encuesta1, 1:encuestaExtra, 2:encuesta2, 3:encuesta3 } = req.body; //desestructuración de objetos

    const date = new Date();
    const tiempoFinalSesion = date.getTime();
    const tiempoSesionTotal = (tiempoFinalSesion - req.session.tiempoSesion) / 1000;

    const newSelection = await Formulario.findById(req.session.usuarioId);
    newSelection.encuesta1 = encuesta1;
    newSelection.encuestaExtra = encuestaExtra;
    newSelection.encuesta2 = encuesta2;
    newSelection.encuesta3 = encuesta3;
    newSelection.tiempoSesionTotal = tiempoSesionTotal;
    await newSelection.save();

    delete req.session.tiempoSesion;
    req.session.destroy();
    res.json({redireccion_url:'/'});
}

module.exports = indexCtrl;