const indexCtrl = {};
const Formulario = require('../models/Formulario');
const usuarioActual = [];

//  Home  //

indexCtrl.renderHome = (req, res) => {
    res.render('home');
};

//  Nuevo usuario registrado  //

indexCtrl.createNewUser = async (req, res) => {
    const { nombre, documento, programa } = req.body;
    const newFormulario = new Formulario({nombre, documento, programa});
    const savedFormulario = await newFormulario.save(); //const newFormulario = await Formulario.find().lean(); //para cargar todos los datos
    const newFormularioId = savedFormulario._id;
    console.log('este es el id',newFormularioId);
    usuarioActual.push(newFormularioId);
    console.log('usuario actual', usuarioActual);
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
    res.render('derechos', mostrar);
};

indexCtrl.renderOtros = (req, res) => {
    const mostrar = {mostrar_navbar:true, mostrar_arrowBack_redirectServicios:true};
    res.render('otros', mostrar);
};

//  Procesar selección hecha por usuario  //

indexCtrl.userSelection = async (req, res) => {
    const { servicio } = req.body;
    console.log('servicio solicitado',servicio);
    const date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    const horaActual = date.toTimeString().split(' ')[0];
    const fechaYhora = `fecha ${fechaActual} y hora ${horaActual}`;

    const newSelection = await Formulario.findOne().sort({_id:-1}).limit(1);
    newSelection.servicio = servicio;
    newSelection.fechaYhora = fechaYhora;
    await newSelection.save();
    console.log('guardado',newSelection);
    res.json({resumen_url:'/Resumen'});
}

//  Obtener la solicitud completa  //

indexCtrl.resumenSolicitud = async (req, res) => {
    const Resumen = await Formulario.findOne().sort({_id:-1}).limit(1);
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

    const newSelection = await Formulario.findOne().sort({_id:-1}).limit(1);
    newSelection.encuesta1 = encuesta1;
    newSelection.encuestaExtra = encuestaExtra;
    newSelection.encuesta2 = encuesta2;
    newSelection.encuesta3 = encuesta3;
    await newSelection.save();

    res.json({redireccion_url:'/'});
}

module.exports = indexCtrl;