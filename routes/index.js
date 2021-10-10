var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');
const validatorController = require('../controllers/validatorController');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Empório do Laser' });
});

/* GET nav bar */
router.get('/sobre', function (req, res, next) {
  res.render('about-us', { title: 'Sobre Nós' });
});

router.get('/sac', function (req, res, next) {
  res.render('sac', { title: 'Contato/SAC' });
});

router.get('/identifique-se', function (req, res, next) {
  if (req.session.usuario) {
    res.render('my-account', { title: 'Minha Conta' });
  } else {
    res.render('login-cadastro', { title: 'Minha Conta' });
  }
});

router.get('/minha-conta', auth, function (req, res, next) {
  res.render('my-account', { title: 'Minha Conta' });
});

router.get('/carrinho', function (req, res, next) {
  res.render('carrinho', { title: 'Carrinho' });
});

router.get('/fechar-compra', function (req, res, next) {
  res.render('fechar-compra', { title: 'Fechar Compra'});
});

/* POST nav bar */
router.post('/cadastrar', usuarioController.cadastrar);

router.post('/login', usuarioController.logar);

/* Logoff */
router.post('/logout', usuarioController.logout);

router.get('/validar-cpf-cnpj', validatorController.validarCpfCnpj);

router.get('/validar-email', validatorController.validarEmail);

module.exports = router;
