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
  res.render('about-us', { title: 'Empório do Laser - Sobre Nós' });
});

router.get('/sac', function (req, res, next) {
  res.render('sac', { title: 'Empório do Laser - Contato/SAC' });
});

router.get('/identifique-se', function (req, res, next) {
  if (req.session.usuario) {
    res.render('my-account', { title: 'Empório do Laser - Minha Conta' });
  } else {
    res.render('login-cadastro', { title: 'Empório do Laser - Entre ou Cadastre-se' });
  }
});

router.get('/minha-conta', auth, function (req, res, next) {
  res.render('my-account', { title: 'Empório do Laser - Minha Conta' });
});

/* POST nav bar */
router.post('/cadastrar', usuarioController.cadastrar);

router.post('/login', usuarioController.logar);

/* Logoff */
router.post('/logout', usuarioController.logout);

router.get('/validar-cpf-cnpj', validatorController.validarCpfCnpj);

router.get('/validar-cpf-cnpj-unico', validatorController.validarCpfCnpjUnico);

router.get('/validar-email', validatorController.validarEmail);

module.exports = router;
