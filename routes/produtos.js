var express = require('express');
var router = express.Router();

/* GET nav bar Produtos */
router.get('/cakeboards', function (req, res, next) {
  res.render('navbar/produtos/cakeboards', { title: 'Produtos: Cakeboards' });
});
router.get('/caixas-cenario', function (req, res, next) {
  res.render('navbar/produtos/caixas-cenario', { title: 'Produtos: Cenário' });
});
router.get('/topo-bolos', function (req, res, next) {
  res.render('navbar/produtos/topo-bolos', { title: 'Produtos: Topo de bolos' });
});

module.exports = router;
