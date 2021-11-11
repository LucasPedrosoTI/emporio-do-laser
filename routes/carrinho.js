const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const carrinhoController = require('../controllers/carrinhoController');

/* GET carrinho */
router.get('/', function (req, res, next) {
  res.render('carrinho');
});

router.get('/pagamento', auth, carrinhoController.pagamento);
router.get('/listar', carrinhoController.listar);

/* POST Carrinho */
router.post('/excluir', carrinhoController.excluir);
router.post('/alterar-qtd-items', carrinhoController.alterarQtd);

router.post('/add-carrinho', carrinhoController.addAoCarrinho);

router.post('/fechar-pedido', carrinhoController.fecharPedido);

module.exports = router;
