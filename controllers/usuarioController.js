const { Usuario } = require('../database/models');
const isValidCPF = require('../utils/validaCpf');
const isValidCNPJ = require('../utils/validaCnpj');
const bcrypt = require('bcrypt');

module.exports = {
  logar: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      if (!bcrypt.compareSync(senha, usuario.senha)) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      usuario.senha = undefined;

      req.session.usuario = usuario;

      res.redirect('minha-conta');
    } catch (error) {
      console.log(error);
      return renderWithError(res, error);
    }
  },

  cadastrar: async (req, res) => {
    const { nome, email, senha, cpfCNPJ, telefone, pfOuPj } = req.body;

    try {
      let user;

      if (pfOuPj === 'pf') {
        if (!isValidCPF(cpfCNPJ)) {
          return res.render('login-cadastro', { error: 'CPF inválido' });
        }
        user = await Usuario.createPF(email, senha, telefone, nome, cpfCNPJ);
      } else {
        if (!isValidCNPJ(cpfCNPJ)) {
          return res.render('login-cadastro', { error: 'CNPJ inválido' });
        }
        user = await Usuario.createPJ(email, senha, telefone, nome, cpfCNPJ);
      }

      user.senha = undefined;

      req.session.usuario = user;

      return res.redirect('minha-conta');
    } catch (error) {
      console.log(error);
      return renderWithError(res, error);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.redirect('/');
    } catch (error) {
      return renderWithError(res, error);
    }
  },
};

function renderWithError(res, error) {
  return res.render('login-cadastro', { error: error.message });
}
