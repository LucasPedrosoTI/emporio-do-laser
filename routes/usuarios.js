const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.put('/alterar-email', usuarioController.alterarEmail);
router.put('/alterar-senha', usuarioController.alterarSenha);
router.put('/alterar-dados', usuarioController.alterarDados);

router.put('/alterar-endereco', usuarioController.alterarEndereco);
router.delete('/excluir-endereco', usuarioController.excluirEndereco);
router.post('/cadastrar-endereco', usuarioController.cadastrarEndereco);

module.exports = router;
