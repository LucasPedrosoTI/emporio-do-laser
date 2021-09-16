var express = require('express');
var router = express.Router();
const IndexModel = require('../database/models/usuario');
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
  // if (req.session.usuario) { // não funcionando "Cannot ready property 'usuario' of undefined"
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

router.post('/authlogin', async (req, res, next) => {
  const login = await IndexModel.findOne({where: {email: req.body.email}}); // não funcionando
  console.log(login);
  // if (req.body.email == login.email && req.body.senha == login.senha) {
  if (req.session.usuario) {
    // req.session.usuario = login.email;
    res.redirect('/minha-conta');
  } else {
    res.redirect('/identifique-se');
  }
});

/* Logoff */
router.get('/logout', (req, res) =>{
  // req.session.destroy(); // Não está funcionando "Cannot ready property 'destroy' of undefined"
  res.redirect('/');
});

module.exports = router;
