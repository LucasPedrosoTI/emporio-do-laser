const express = require('express');
const router = express.Router();
const cupomController = require('../controllers/cupomController');

router.put('/alterar-cupom', cupomController.alterarCupom);
router.delete('/habilitar-desabilitar', cupomController.habilitarDesabilitarCupom);
router.post('/cadastrar-cupom', cupomController.cadastrarCupom);

module.exports = router;
