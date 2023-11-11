const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = process.env;
const helpers = {};

const EMAIL_USER = EMAIL;
const PASSWORD_USER = PASSWORD;

helpers.enviarMail = async (subject, text) => {
    const config = {
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user: EMAIL_USER,
            pass: PASSWORD_USER
        }
    }
    const mensaje = {
        from : EMAIL_USER,
        to : EMAIL_USER,
        subject,
        text
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

};

module.exports = helpers;