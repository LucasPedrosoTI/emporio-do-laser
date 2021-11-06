var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');

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

router.get('/enderecos', auth, usuarioController.listarEnderecos);

router.get('/logo', auth, function (req, res, next) {
  res.render('minha-conta/logo', { title: 'Minha Conta: Logo', menu: 'logo' });
});

router.get('/cadastrarendereco', auth, function (req, res, next) {
  res.render('minha-conta/cadastrarendereco', { title: 'Minha Conta: Cadastrar novo Endereço', menu: 'enderecos' });
});

router.get('/editarendereco', auth, usuarioController.editarEnderecos);

router.get('/cupons', auth, function (req, res, next) {
  res.render('minha-conta-admin/cupons', { title: 'Minha Conta: Cupons', menu: 'cupons' });
});

router.get('/meusprodutos', auth, function (req, res, next) {
  res.render('minha-conta-admin/meusprodutos', { title: 'Minha Conta: Produtos', menu: 'produtos' });
});

module.exports = router;
