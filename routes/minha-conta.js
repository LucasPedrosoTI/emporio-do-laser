var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')

/* GET nav bar Produtos */
router.get('/pedidos', auth, function (req, res, next) {
  res.render('minha-conta/pedidos', { title: 'Minha Conta: Pedidos' });
});

router.get('/creditos', auth, function (req, res, next) {
  res.render('minha-conta/creditos', { title: 'Minha Conta: Creditos' });
});

router.get('/email', auth, function (req, res, next) {
  res.render('minha-conta/email', { title: 'Minha Conta: Email' });
});

router.get('/senha', auth, function (req, res, next) {
  res.render('minha-conta/senha', { title: 'Minha Conta: Senha' });
});

router.get('/dados', auth, function (req, res, next) {
  res.render('minha-conta/dados', { title: 'Minha Conta: Dados' });
});

router.get('/enderecos', auth, function (req, res, next) {
  res.render('minha-conta/enderecos', { title: 'Minha Conta: Endereços' });
});

router.get('/cartoes', auth, function (req, res, next) {
  res.render('minha-conta/cartoes', { title: 'Minha Conta: Cartões' });
});

router.get('/cadastrarendereco', auth, function (req, res, next) {
  res.render('minha-conta/cadastrarendereco', { title: 'Minha Conta: Cadastrar novo Endereço' });
});

router.get('/editarendereco', auth, function (req, res, next) {
  res.render('minha-conta/editarendereco', { title: 'Minha Conta: Cadastrar novo Endereço' });
});
module.exports = router;
