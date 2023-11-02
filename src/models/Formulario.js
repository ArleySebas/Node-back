const {Schema, model} = require('mongoose');

const formularioSchema = new Schema({
    nombre: {type: String, maxlength: 50, default: null},
    documento: {type: Number, default: null},
    programa: {type:String, maxlength: 70, default: null},
    servicio: {type: String, maxlength: 70, default: null},
    encuesta1: {type: String, maxlength: 7, default: null},
    encuestaExtra: {type: String, maxlength: 3, default: null},
    encuesta2: {type: String, maxlength: 25, default: null},
    encuesta3: {type: String, maxlength: 3, default: null},
    fechaYhora: {type: String, maxlength: 50, default: null},
}, {
    timestamps: true,
});


module.exports = model('Formulario', formularioSchema);

