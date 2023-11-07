const helpers = {};

helpers.verificarSesion = (req, res, next) => {
    if (req.session.usuarioId){
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = helpers;