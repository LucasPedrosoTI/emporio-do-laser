const isValidCPF = require('../utils/validaCpf');
const { Usuario, PessoaFisica } = require('../database/models');

function sendError(res, msg) {
  res.writeHead(400, msg);
  res.send();
}

module.exports = {
  validarCpfCnpj: async (req, res) => {
    const { cpfCNPJ } = req.query;
    const isValidCpf = isValidCPF(cpfCNPJ);
    const usuario = isValidCpf && (await PessoaFisica.findOne({ where: { cpf: cpfCNPJ } }));

    if (isValidCpf && !usuario) {
      res.sendStatus(200);
    } else if (usuario) {
      sendError(res, 'CPF já em uso');
    } else {
      sendError(res, 'CPF inválido');
    }
  },

  validarEmail: async (req, res) => {
    const { email } = req.query;

    if (await Usuario.findOne({ where: { email } })) {
      sendError(res, 'E-mail já em uso');
    } else {
      res.sendStatus(200);
    }
  },
};
