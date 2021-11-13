const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');
const cupomController = require('../controllers/cupomController');
const pedidoController = require('../controllers/pedidoController');
const enderecoController = require('../controllers/enderecoController');

/* GET nav bar Produtos */

router.get('/email', auth, function (req, res, next) {
  res.render('minha-conta/email', { menu: 'email' });
});

router.get('/senha', auth, function (req, res, next) {
  res.render('minha-conta/senha', { menu: 'senha' });
});

router.get('/dados', auth, function (req, res, next) {
  res.render('minha-conta/dados', { menu: 'dados' });
});

router.get('/enderecos', auth, enderecoController.listarEnderecos);

router.get('/logo', auth, function (req, res, next) {
  res.render('minha-conta/logo', { menu: 'logo' });
});

router.get('/cadastrarendereco', auth, function (req, res, next) {
  res.render('minha-conta/cadastrarendereco', { menu: 'enderecos' });
});

router.get('/editarendereco', auth, enderecoController.renderEditarEnderecos);

router.get('/pedidos', auth, pedidoController.listarPedidos);

// ADMINISTRADOR

router.get('/cupons', auth, cupomController.listarCupoms);

router.get('/meusprodutos', auth, function (req, res, next) {
  res.render('minha-conta-admin/meusprodutos', { menu: 'produtos' });
});

router.get('/cadastrarcupons', auth, cupomController.renderCadastrarCupom);

router.get('/editarcupons', auth, cupomController.editarCupom);

module.exports = router;
