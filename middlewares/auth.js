function auth(req, res, next) {
  if (req.session.usuario) {
    return next();
  } else {
    res.redirect('/identifique-se');
  }
}

module.exports = auth;
