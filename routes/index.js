var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');

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

/* POST nav bar */
router.post('/cadastrar', function (req, res, next) {
  /* teste */
  console.log('CHAMADO VIA POST - cadastro cadastrar');
  console.log(req.body);
});

router.post('/login', usuarioController.logar);

/* Logoff */
router.post('/logout', usuarioController.logout);

module.exports = router;
