function auth(req, res, next) {
    if (typeof req.session != "undefined") {
        return next();
    } else {
        res.redirect("/identifique-se");
    }
};

module.exports = auth;