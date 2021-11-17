function authAdmin(req, res, next) {
  if (req.session.usuario.admin) {
    return next();
  } else {
    res.redirect('/minha-conta');
  }
}

module.exports = authAdmin;
