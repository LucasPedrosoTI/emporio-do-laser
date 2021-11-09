var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');
/* GET nav bar Produtos */
router.get('/', produtoController.renderProdutos);

router.get('/produto', function (req, res, next) {
    res.render('produto', { title: 'Empório do Laser - Sobre Nós' });
  });

module.exports = router;
