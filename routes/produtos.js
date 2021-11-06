const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

module.exports = router;
