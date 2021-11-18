const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/cadastrar-categoria', categoriaController.cadastrarCategoria);
router.put('/alterar-categoria', categoriaController.alterarCategoria);

module.exports = router;
