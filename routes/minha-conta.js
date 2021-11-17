const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usuarioController = require('../controllers/usuarioController');
const cupomController = require('../controllers/cupomController');
const pedidoController = require('../controllers/pedidoController');
const enderecoController = require('../controllers/enderecoController');
const produtoController = require('../controllers/produtoController');

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

router.get('/cadastrarcupons', auth, cupomController.renderCadastrarCupom);

router.get('/editarcupons', auth, cupomController.editarCupom);

router.get('/meusprodutos', auth, produtoController.listarProdutos);

router.get('/cadastrarproduto', auth, produtoController.cadastrarProdutoForm);

router.get('/editarproduto', auth, produtoController.editarProduto);

router.get('/estoqueproduto', auth, produtoController.estoqueProduto);

router.get('/cadastrartamanho', auth, produtoController.cadastrarTamanhoForm);

router.get('/editartamanho', auth, produtoController.editarTamanho);

module.exports = router;
