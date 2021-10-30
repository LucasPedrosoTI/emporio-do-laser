const { Usuario, Cliente, PessoaJuridica, PessoaFisica } = require('../database/models');
const isValidCPF = require('../utils/validaCpf');
const isValidCNPJ = require('../utils/validaCnpj');
const bcrypt = require('bcrypt');

module.exports = {
  logar: async (req, res) => {
    const { email, senha, manterLogado } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email }, include: [{ model: Cliente, include: [PessoaFisica, PessoaJuridica] }] });

      if (!usuario) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      if (!bcrypt.compareSync(senha, usuario.senha)) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      usuario.senha = undefined;
      req.session.usuario = usuario;

      if (manterLogado) {
        res.cookie('manterLogado', usuario.email, { maxAge: 3600000 });
      }

      res.redirect('minha-conta');
    } catch (error) {
      console.log(error);
      return renderWithError(res, error);
    }
  },

  cadastrar: async (req, res) => {
    const { nome, email, senha, cpfCNPJ, telefone, pfOuPj } = req.body;

    try {
      let usuario;

      if (pfOuPj === 'pf') {
        if (!isValidCPF(cpfCNPJ)) {
          return res.render('login-cadastro', { error: 'CPF inválido' });
        }
        usuario = await Usuario.createPF(email, senha, telefone, nome, cpfCNPJ);
      } else {
        if (!isValidCNPJ(cpfCNPJ)) {
          return res.render('login-cadastro', { error: 'CNPJ inválido' });
        }
        usuario = await Usuario.createPJ(email, senha, telefone, nome, cpfCNPJ);
      }

      usuario.senha = undefined;

      req.session.usuario = usuario;

      return res.redirect('minha-conta');
    } catch (error) {
      console.log(error);
      return renderWithError(res, error);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.clearCookie('manterLogado');
      res.redirect('/');
    } catch (error) {
      return renderWithError(res, error);
    }
  },

  alterarEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const { id } = req.session.usuario;
      await Usuario.update(
        { email },
        {
          where: {
            id,
          },
        }
      );

      req.session.usuario.email = email;
    } catch (error) {
      return res.render('minha-conta/email', { error: error.message, menu: 'email' });
    }

    return res.redirect('/minha-conta/email');
  },

  alterarSenha: async (req, res) => {
    try {
      const { senhaAtual, senha } = req.body;
      const { id } = req.session.usuario;

      const usuario = await Usuario.findOne({ where: { id } });

      if (!bcrypt.compareSync(senhaAtual, usuario.senha)) {
        return res.render('minha-conta/senha', { error: 'Usuário/Senha inválido', menu: 'senha' });
      }

      await Usuario.update(
        { senha },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      return res.render('minha-conta/senha', { error: error.message, menu: 'senha' });
    }

    return res.redirect('/minha-conta/senha');
  },

  alterarDados: async (req, res) => {
    try {
      const { nome, cpfCNPJ, telefone } = req.body;
      const { id, Cliente: cliente } = req.session.usuario;

      req.session.usuario.Cliente = await Cliente.updateDados(cliente.id, telefone, cpfCNPJ, nome);
    } catch (error) {
      return res.render('minha-conta/dados', { error: error.message, menu: 'dados' });
    }

    return res.redirect('/minha-conta/dados');
  },
};

function renderWithError(res, error) {
  return res.render('login-cadastro', { error: error.message });
}
