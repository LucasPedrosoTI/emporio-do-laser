const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.get('/:id', enderecoController.buscarEnderecoPorId);

module.exports = router;
