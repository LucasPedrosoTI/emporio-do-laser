var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');

/* GET nav bar Produtos */
router.get('/pedidos', auth, function (req, res, next) {
  res.render('minha-conta/pedidos', { menu: 'pedidos' });
});

router.get('/email', auth, function (req, res, next) {
  res.render('minha-conta/email', { menu: 'email' });
});

router.get('/senha', auth, function (req, res, next) {
  res.render('minha-conta/senha', { menu: 'senha' });
});

router.get('/dados', auth, function (req, res, next) {
  res.render('minha-conta/dados', { menu: 'dados' });
});

router.get('/enderecos', auth, usuarioController.listarEnderecos);

router.get('/logo', auth, function (req, res, next) {
  res.render('minha-conta/logo', { menu: 'logo' });
});

router.get('/cadastrarendereco', auth, function (req, res, next) {
  res.render('minha-conta/cadastrarendereco', { menu: 'enderecos' });
});

router.get('/editarendereco', auth, usuarioController.editarEnderecos);

router.get('/cupons', auth, function (req, res, next) {
  res.render('minha-conta-admin/cupons', { menu: 'cupons' });
});

router.get('/meusprodutos', auth, function (req, res, next) {
  res.render('minha-conta-admin/meusprodutos', { menu: 'produtos' });
});

module.exports = router;
