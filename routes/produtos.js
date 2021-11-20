const express = require('express');
const multer = require('multer');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const uploadProduto = require('../lib/uploadProduto');
const uploadProdutoUpdate = require('../lib/uploadProdutoUpdate');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

router.get('/:id', produtoController.renderProduto);

router.get('/tamanhos/:id', produtoController.getTamanhoById);

router.post('/cadastrar-produto', uploadProduto, produtoController.cadastrarProduto);

router.put('/alterar-produto', uploadProdutoUpdate, produtoController.alterarProduto);

router.post('/cadastrar-tamanho', produtoController.cadastrarTamanho);

router.put('/alterar-tamanho', produtoController.alterarTamanho);

module.exports = router;
