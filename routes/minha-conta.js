const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const usuarioController = require('../controllers/usuarioController');
const cupomController = require('../controllers/cupomController');
const pedidoController = require('../controllers/pedidoController');
const enderecoController = require('../controllers/enderecoController');
const produtoController = require('../controllers/produtoController');
const categoriaController = require('../controllers/categoriaController');

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

// --- ADMINISTRADOR --- //

  // --> Cupons
router.get('/cupons', authAdmin, cupomController.listarCupoms);
router.get('/cadastrarcupons', authAdmin, cupomController.renderCadastrarCupom);
router.get('/editarcupons', authAdmin, cupomController.editarCupom);

  // --> Produtos
router.get('/meusprodutos', authAdmin, produtoController.listarProdutos);
router.get('/cadastrarproduto', authAdmin, produtoController.cadastrarProdutoForm);
router.get('/editarproduto', authAdmin, produtoController.editarProduto);
router.get('/estoqueproduto', authAdmin, produtoController.estoqueProduto);
router.get('/cadastrartamanho', authAdmin, produtoController.cadastrarTamanhoForm);
router.get('/editartamanho', authAdmin, produtoController.editarTamanho);

  // -- Categorias
router.get('/categorias', authAdmin, categoriaController.listarCategorias);

  // --> Pedidos
router.get('/gerenciarpedidos', authAdmin, pedidoController.gerenciarPedidos);
router.get('/historicopedidos', authAdmin, pedidoController.listAllPedidos);
router.put('/alterar-status-pedido', pedidoController.alterarStatusPedido);

// ----------------------- //

module.exports = router;
