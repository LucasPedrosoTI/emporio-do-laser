const express = require('express');
const multer = require('multer');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const uploadProduto = require('../lib/uploadProduto');
const uploadProdutoUpdate = require('../lib/uploadProdutoUpdate');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

router.put('/habilitar-desabilitar', produtoController.habilitarDesabilitarProduto);

router.put('/habilitar-desabilitar-tamanho', produtoController.habilitarDesabilitarTamanho);

router.get('/:id', produtoController.renderProduto);

router.get('/tamanhos/:id', produtoController.getTamanhoById);

router.post('/cadastrar-produto', uploadProduto, produtoController.cadastrarProduto);

router.put('/alterar-produto', uploadProdutoUpdate, produtoController.alterarProduto);

router.post('/cadastrar-tamanho', produtoController.cadastrarTamanho);

router.put('/alterar-tamanho', produtoController.alterarTamanho);

router.put('/alterar-estoque', produtoController.alterarEstoque);

module.exports = router;
