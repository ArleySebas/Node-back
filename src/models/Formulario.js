const {Schema, model} = require('mongoose');

const formularioSchema = new Schema({
    nombre: {type: String, required: false, maxlength: 50, default: null},
    documento: {type: Number, required: false, maxlength: 11,default: null},
    programa: {type:String, required: false, maxlength: 70, default: null},
    servicio: {type: String, required: false, maxlength: 70, default: null},
    encuesta1: {type: String, required: false, maxlength: 10, default: null},
    encuestaExtra: {type: String, required: false, maxlength: 5, default: null},
    encuesta2: {type: String, required: false, maxlength: 30, default: null},
    encuesta3: {type: String, required: false, maxlength: 5, default: null},
    fechaYhora: {type: String, required: false, maxlength: 50, default: null},
    tiempoSolicitud: {type: String, required: false, maxlength: 30, default: null},
    tiempoSesionTotal: {type: String, required: false, maxlength: 30, default: null},
}, {
    timestamps: true,
});


module.exports = model('Formulario', formularioSchema);

