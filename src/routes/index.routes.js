const { Router } = require('express');
const router = Router();

const { renderHome, renderServicios, renderExamenes, 
    renderCertificados, renderDerechos, renderConstancias, 
    renderOtros, renderEncuesta, createNewUser, userSelection, 
    renderResumen, resumenSolicitud, procesarEncuesta,
} = require('../controllers/index.controllers');


//  Home  //
router.get('/', renderHome);

router.post('/Registrar-usuario', createNewUser);

//  Render servicios  //
router.get('/Servicios', renderServicios);

//  Render servicios específicos  //

router.get('/Examenes', renderExamenes);

router.get('/Certificados', renderCertificados);

router.get('/Derechos', renderDerechos);

router.get('/Constancias', renderConstancias);

router.get('/Otros', renderOtros);

//  Procesar selección hecha por usuario  //

router.post('/User-selection', userSelection);

//  Obtener la solicitud completa  //

router.get('/Resumen-solicitud', resumenSolicitud);

//  Render resumen  //

router.get('/Resumen', renderResumen);

//  Render encuesta  //

router.get('/Encuesta', renderEncuesta);

//  Procesar encuesta en BD  //;

router.post('/Procesar-encuesta', procesarEncuesta);

module.exports = router;
