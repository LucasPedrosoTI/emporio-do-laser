function auth(req, res, next) {
    // if (typeof req.session.usuario != "undefined") { // não funcionando "Cannot ready property 'usuario' of undefined"
    if (typeof req.session != "undefined") {
        return next();
    } else {
        res.redirect("/identifique-se");
    }
};

module.exports = auth;