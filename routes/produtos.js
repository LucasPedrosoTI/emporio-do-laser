const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

router.get('/:id', produtoController.renderProduto);

router.get('/tamanhos/:id', produtoController.getTamanhoById);

router.post('/cadastrar-produto', produtoController.cadastrarProduto);
router.put('/cadastrar-produto', produtoController.alterarProduto);

module.exports = router;
