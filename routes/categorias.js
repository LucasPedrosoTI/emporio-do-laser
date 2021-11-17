const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/cadastrar-categoria', categoriaController.cadastrarCategorias);

module.exports = router;
