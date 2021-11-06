const express = require('express');
const multer = require('multer');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const uploadLogo = require('../lib/uploadLogo');

router.put('/alterar-email', usuarioController.alterarEmail);
router.put('/alterar-senha', usuarioController.alterarSenha);
router.put('/alterar-dados', usuarioController.alterarDados);
router.put('/alterar-logo', uploadLogo, usuarioController.alterarLogo);

router.put('/alterar-endereco', usuarioController.alterarEndereco);
router.delete('/excluir-endereco', usuarioController.excluirEndereco);
router.post('/cadastrar-endereco', usuarioController.cadastrarEndereco);

module.exports = router;
