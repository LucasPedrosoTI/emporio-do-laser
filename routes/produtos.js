var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

router.get('/:id', produtoController.renderProduto);

router.get('/tamanhos/:id', produtoController.getTamanhoById);

module.exports = router;
