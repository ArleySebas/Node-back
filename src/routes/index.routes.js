const { Router } = require('express');

const router = Router();

const { renderHome, renderClave, renderServicios, renderExamenes, 
    renderCertificados, renderDerechos, renderConstancias, 
    renderOtros, renderEncuesta, createNewUser, userSelection, 
    renderResumen, resumenSolicitud, procesarEncuesta,
} = require('../controllers/index.controllers');

const { verificarSesion } = require('../helpers/Auth');


//  Home  //
router.get('https://proyecto-node-livid.vercel.app/', renderHome);

router.post('/Registrar-usuario', createNewUser);

//  Cambiar clave  //

router.get('/Clave', renderClave);

//  Render servicios  //
router.get('/Servicios', verificarSesion, renderServicios);

//  Render servicios específicos  //

router.get('/Examenes', verificarSesion, renderExamenes);

router.get('/Certificados', verificarSesion, renderCertificados);

router.get('/Derechos', verificarSesion, renderDerechos);

router.get('/Constancias', verificarSesion, renderConstancias);

router.get('/Otros', verificarSesion, renderOtros);

//  Procesar selección hecha por usuario  //

router.post('/User-selection', userSelection);

//  Obtener la solicitud completa  //

router.get('/Resumen-solicitud', verificarSesion, resumenSolicitud);

//  Render resumen  //

router.get('/Resumen', verificarSesion, renderResumen);

//  Render encuesta  //

router.get('/Encuesta', verificarSesion, renderEncuesta);

//  Procesar encuesta en BD  //;

router.post('/Procesar-encuesta', procesarEncuesta);


module.exports = router;
