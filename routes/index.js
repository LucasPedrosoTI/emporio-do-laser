var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Empório do Laser' });
});

/* GET nav bar */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Empório do Laser' });
});
router.get('/sobre', function (req, res, next) {
  res.render('about-us', { title: 'Sobre Nós' });
});
router.get('/sac', function (req, res, next) {
  res.render('sac', { title: 'Contato/SAC' });
});
router.get('/minha-conta', function (req, res, next) {
  res.render('my-account', { title: 'Minha Conta' });
});

module.exports = router;
