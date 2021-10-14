var express = require('express');
var router = express.Router();

/* GET nav bar Produtos */
router.get('/pedidos', function (req, res, next) {
  res.render('minha-conta/pedidos', { title: 'Minha Conta: Pedidos' });
});

router.get('/creditos', function (req, res, next) {
  res.render('minha-conta/creditos', { title: 'Minha Conta: Creditos' });
});

router.get('/email', function (req, res, next) {
  res.render('minha-conta/email', { title: 'Minha Conta: Email' });
});

router.get('/senha', function (req, res, next) {
  res.render('minha-conta/senha', { title: 'Minha Conta: Senha' });
});

router.get('/dados', function (req, res, next) {
  res.render('minha-conta/dados', { title: 'Minha Conta: Dados' });
});

router.get('/enderecos', function (req, res, next) {
  res.render('minha-conta/enderecos', { title: 'Minha Conta: Endereços' });
});

router.get('/cartoes', function (req, res, next) {
  res.render('minha-conta/cartoes', { title: 'Minha Conta: Cartões' });
});

module.exports = router;
