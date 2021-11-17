function authAdmin(req, res, next) {
  if (req.session.usuario) {
    if (req.session.usuario.admin) {
      return next();
    } else {
      res.redirect('/minha-conta')
    }
  } else {
    res.redirect('/identifique-se');
  }
}

module.exports = authAdmin;
