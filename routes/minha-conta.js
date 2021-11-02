var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET nav bar Produtos */
router.get('/pedidos', auth, function (req, res, next) {
  res.render('minha-conta/pedidos', { title: 'Minha Conta: Pedidos', menu: 'pedidos' });
});

router.get('/email', auth, function (req, res, next) {
  res.render('minha-conta/email', { title: 'Minha Conta: Email', menu: 'email' });
});

router.get('/senha', auth, function (req, res, next) {
  res.render('minha-conta/senha', { title: 'Minha Conta: Senha', menu: 'senha' });
});

router.get('/dados', auth, function (req, res, next) {
  res.render('minha-conta/dados', { title: 'Minha Conta: Dados', menu: 'dados' });
});

router.get('/enderecos', auth, function (req, res, next) {
  res.render('minha-conta/enderecos', { title: 'Minha Conta: Endereços', menu: 'enderecos' });
});

router.get('/cadastrarendereco', auth, function (req, res, next) {
  res.render('minha-conta/cadastrarendereco', { title: 'Minha Conta: Cadastrar novo Endereço' });
});

router.get('/editarendereco', auth, function (req, res, next) {
  res.render('minha-conta/editarendereco', { title: 'Minha Conta: Cadastrar novo Endereço', menu: 'enderecos' });
});
module.exports = router;
