const {Schema, model} = require('mongoose');

const formularioSchema = new Schema({
    nombre: {type: String, required: false, maxlength: 50, default: 0},
    documento: {type: Number, required: false, maxlength: 11,default: 0},
    programa: {type:String, required: false, maxlength: 70, default: 0},
    servicio: {type: String, required: false, maxlength: 70, default: 0},
    encuesta1: {type: String, required: false, maxlength: 10, default: 0},
    encuestaExtra: {type: String, required: false, maxlength: 5, default: 0},
    encuesta2: {type: String, required: false, maxlength: 30, default: 0},
    encuesta3: {type: String, required: false, maxlength: 5, default: 0},
    fechaYhora: {type: String, required: false, maxlength: 50, default: 0},
    tiempoSolicitud: {type: String, required: false, maxlength: 30, default: 0},
    tiempoSesionTotal: {type: String, required: false, maxlength: 30, default: 0},
}, {
    timestamps: true,
});


module.exports = model('Formulario', formularioSchema);

