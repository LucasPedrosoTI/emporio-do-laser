const isValidCPF = require('../utils/validaCpf');
const isValidCNPJ = require('../utils/validaCnpj');
const { Usuario, PessoaFisica, PessoaJuridica } = require('../database/models');

function sendError(res, msg) {
  res.writeHead(400, msg);
  res.send();
}

module.exports = {
  validarCpfCnpj: async (req, res) => {
    const { cpfCNPJ } = req.query;
    const isCpf = cpfCNPJ.length <= 14;
    const isValid = isCpf ? isValidCPF(cpfCNPJ) : isValidCNPJ(cpfCNPJ);

    if (isValid) {
      res.sendStatus(200);
    } else {
      isCpf ? sendError(res, 'CPF inválido') : sendError(res, 'CNPJ inválido');
    }
  },

  validarCpfCnpjUnico: async (req, res) => {
    const { cpfCNPJ } = req.query;
    const isCpf = cpfCNPJ.length <= 14;
    const isValid = isCpf ? isValidCPF(cpfCNPJ) : isValidCNPJ(cpfCNPJ);
    const usuario = isValid ? (isCpf ? await PessoaFisica.findOne({ where: { cpf: cpfCNPJ } }) : await PessoaJuridica.findOne({ where: { cnpj: cpfCNPJ } })) : null;

    if (isValid && !usuario) {
      res.sendStatus(200);
    } else if (usuario) {
      isCpf ? sendError(res, 'CPF já em uso') : sendError(res, 'CNPJ já em uso');
    } else {
      isCpf ? sendError(res, 'CPF inválido') : sendError(res, 'CNPJ inválido');
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
