const nodemailer = require('nodemailer');
const helpers = {};

helpers.enviarMail = async (subject, text) => {
    const config = {
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user: 'arleysebas123@gmail.com',
            pass: 'ompp xyfw onkz wtbh'
        }
    }
    const mensaje = {
        from : 'arleysebas123@gmail.com',
        to : 'arleysebas123@gmail.com',
        subject,
        text
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

};

module.exports = helpers;