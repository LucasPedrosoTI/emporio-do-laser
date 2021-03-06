const express = require('express');
const router = express.Router();
const cupomController = require('../controllers/cupomController');

router.put('/alterar-cupom', cupomController.alterarCupom);
router.put('/habilitar-desabilitar', cupomController.habilitarDesabilitarCupom);
router.post('/cadastrar-cupom', cupomController.cadastrarCupom);
router.get('/validar-cupom', cupomController.validarCupom);

module.exports = router;
