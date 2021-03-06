const { Usuario, Cliente, PessoaJuridica, PessoaFisica, Endereco } = require('../database/models');
const isValidCPF = require('../utils/validaCpf');
const isValidCNPJ = require('../utils/validaCnpj');
const bcrypt = require('bcrypt');
require('dotenv').config();
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: 'sandbox0f5b4592763f40378b2621ba5625fbba.mailgun.org',
});
const env = process.env.NODE_ENV || 'development';

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
        res.cookie('manterLogado', usuario.email, {
          maxAge: env === 'development' ? 1000 * 60 * 60 * 24 * 365 : 1000 * 60 * 60 * 24 * 7, // 1 semana
        });
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
      return res.render('minha-conta/dados', { error: error.message, menu: 'dados', title: 'Minha Conta: Dados' });
    }

    return res.redirect('/minha-conta/dados');
  },

  alterarLogo: async (req, res) => {
    try {
      const logo = `/img/logos/${req.file.filename}`;
      const { id } = req.session.usuario.Cliente;

      await Cliente.update(
        {
          logo,
        },
        { where: { id } }
      );

      req.session.usuario.Cliente.logo = logo;
    } catch (error) {
      return res.render('minha-conta/logo', { error: error.message, menu: 'logo', title: 'Minha Conta: Logo' });
    }

    return res.redirect('/minha-conta/logo');
  },

  desativarConta: async (req, res) => {
    try {
      const { senha, email } = req.body;
      const { id } = req.session.usuario;

      const usuario = await Usuario.findOne({ where: { id } });

      if (!bcrypt.compareSync(senha, usuario.senha) || email != usuario.email) {
        return res.render('minha-conta/desativarconta', { error: 'Usuário/Senha inválido', menu: 'desativar' });
      }

      await Usuario.destroy(
        {
          where: {
            id,
          },
        }
      );

    } catch (error) {
      return res.render('minha-conta/desativarconta', { error: error.message, menu: 'desativar' });
    }

    req.session.destroy();
    res.clearCookie('manterLogado');
    return res.redirect('/identifique-se');
  },

  enviarEmail: async (req, res) => {
    const { nome, email, subject, text } = req.body;

    const data = {
      from: `${nome} <${email}>`,
      to: 'lucas.pedrosoti@gmail.com',
      subject,
      text,
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) {
        res.render('sac', { message: error.message, alertType: 'danger' });
      } else {
        console.log(body);
        res.render('sac', { message: 'Enviado com sucesso', alertType: 'success' });
      }
    });
  },
};

function renderWithError(res, error) {
  return res.render('login-cadastro', { error: error.message });
}
