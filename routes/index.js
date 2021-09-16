var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Empório do Laser' });
});

/* GET nav bar */
router.get('/sobre', function (req, res, next) {
  res.render('navbar/about-us', { title: 'Sobre Nós' });
});

router.get('/sac', function (req, res, next) {
  res.render('navbar/sac', { title: 'Contato/SAC' });
});

router.get('/identifique-se', function (req, res, next) {
  if (req.session) {
    res.render('navbar/my-account', { title: 'Minha Conta' });
  } else {
    res.render('navbar/login-cadastro', { title: 'Minha Conta' });
  }
});

router.get('/minha-conta', auth, function (req, res, next) {
  res.render('navbar/my-account', { title: 'Minha Conta' });
});

/* POST nav bar */
router.post('/cadastrar', function (req, res, next) {
  /* teste */
  console.log('CHAMADO VIA POST - cadastro cadastrar');
  console.log(req.body);
});

router.post('/authlogin', function (req, res, next) {
  // if (req.body.usuario == email && req.body.senha == senha) {
  if (req.session) {
    // req.session.usuario = req.body.usuario;
    res.redirect('/minha-conta');
  } else {
    res.redirect('/identifique-se');
  }
});

module.exports = router;
