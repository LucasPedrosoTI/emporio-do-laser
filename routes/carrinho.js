var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const carrinhoController = require('../controllers/carrinhoController');

/* GET carrinho */
router.get('/', function (req, res, next) {
    res.render('carrinho', { title: 'Empório do Laser - Carrinho' });
});

router.get('/pagamento', auth, carrinhoController.pagamento);
router.get('/listar', carrinhoController.listar);

/* POST Carrinho */
router.post('/excluir', carrinhoController.excluir);
router.post('/alterar-qtd-items', carrinhoController.alterarQtd);

module.exports = router;
