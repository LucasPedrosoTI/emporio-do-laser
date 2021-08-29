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
  res.render('navbar/about-us', { title: 'Sobre Nós' });
});
router.get('/sac', function (req, res, next) {
  res.render('navbar/sac', { title: 'Contato/SAC' });
});
router.get('/minha-conta', function (req, res, next) {
  res.render('navbar/my-account', { title: 'Minha Conta' });
});

/* GET nav bar Produtos */
router.get('/produtos/cakeboards', function (req, res, next) {
  res.render('navbar/produtos/cakeboards', { title: 'Produtos: Cakeboards' });
});
router.get('/produtos/caixas-cenario', function (req, res, next) {
  res.render('navbar/produtos/caixas-cenario', { title: 'Produtos: Cenário' });
});
router.get('/produtos/topo-bolos', function (req, res, next) {
  res.render('navbar/produtos/topo-bolos', { title: 'Produtos: Topo de bolos' });
});
module.exports = router;
