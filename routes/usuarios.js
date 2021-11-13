const express = require('express');
const multer = require('multer');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const enderecoController = require('../controllers/enderecoController');
const uploadLogo = require('../lib/uploadLogo');

router.put('/alterar-email', usuarioController.alterarEmail);
router.put('/alterar-senha', usuarioController.alterarSenha);
router.put('/alterar-dados', usuarioController.alterarDados);
router.put('/alterar-logo', uploadLogo, usuarioController.alterarLogo);

router.put('/alterar-endereco', enderecoController.alterarEndereco);
router.delete('/excluir-endereco', enderecoController.excluirEndereco);
router.post('/cadastrar-endereco', enderecoController.cadastrarEndereco);

router.post('/enviar-email', usuarioController.enviarEmail);

module.exports = router;
