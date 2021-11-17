const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const freteController = require('../controllers/freteController');

router.get('/calcular-frete-correios', freteController.consultarFreteCorreios);
router.get('/:id', enderecoController.buscarEnderecoPorId);

module.exports = router;
