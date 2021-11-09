const { Usuario, Cliente, PessoaJuridica, PessoaFisica, Endereco, Cupom, CupomCategoria, Categoria } = require('../database/models');
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

  cadastrarEndereco: async (req, res) => {
    try {
      const { destinatario, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;
      const { id: clienteId } = req.session.usuario.Cliente;

      await Endereco.create({ clienteId, destinatario, rua, numero, complemento, bairro, cidade, estado, cep });
    } catch (error) {
      return res.render('minha-conta/cadastrarendereco', { error: error.message, menu: 'enderecos' });
    }

    return res.redirect('/minha-conta/enderecos');
  },

  listarEnderecos: async (req, res) => {
    let clienteId = req.session.usuario.Cliente.id;
    Endereco.findAll({ where: { clienteId } }).then(function (enderecos) {
      res.render('minha-conta/enderecos', { title: 'Minha Conta: Endereços', enderecos: enderecos, menu: 'enderecos' });
    });
  },

  editarEnderecos: async (req, res) => {
    const { enderecoId } = req.query;

    const endereco = await Endereco.findByPk(enderecoId);

    res.render('minha-conta/editarendereco', { title: 'Minha Conta: Alterar Endereço', endereco, menu: 'enderecos' });
  },

  alterarEndereco: async (req, res) => {
    try {
      const { id, destinatario, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

      await Endereco.update({ destinatario, rua, numero, complemento, bairro, cidade, estado, cep }, { where: { id } });
    } catch (error) {
      return res.render('minha-conta/editarendereco', { error: error.message, menu: 'enderecos' });
    }

    return res.redirect('/minha-conta/enderecos');
  },

  excluirEndereco: async (req, res) => {
    try {
      const { id } = req.body;

      await Endereco.destroy({ where: { id } });
    } catch (error) {
      return res.render('minha-conta/enderecos', { error: error.message, menu: 'enderecos' });
    }

    return res.redirect('/minha-conta/enderecos');
  },


  // Funções Administrador

  cadastrarCupom: async (req, res) => {

    console.log(req.body)

    try {
      const { codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categoriaId } = req.body;
      // const { id: clienteId } = req.session.usuario.Cliente;

      const cupom = await Cupom.create({ 
        codigo, 
        descricao, 
        taxaDeDesconto, 
        dataExpiracao, 
        habilitado, 
        ehPorcentagem });

      const categoriaCupom = await CupomCategoria.create({
        cupomId: cupom.id,
        categoriaId
      })

    } catch (error) {
      return res.render('minha-conta-admin/cadastrarcupons', { error: error.message, menu: 'cupons' });
    }

    return res.redirect('/minha-conta/cupons');
  },

  listarCupoms: async (req, res) => {

    // let clienteId = req.session.usuario.Cliente.id;
    await Cupom.findAll().then(function (cupoms) {
      res.render('minha-conta-admin/cupons', { title: 'Minha Conta: Cupoms', cupoms: cupoms, menu: 'cupons' });
    });

  },

  editarCupom: (req, res) => {

  },

  alterarCupom: (req, res) => {

  },

  habilitarDesabilitarCupom: (req, res) => {

  },

};

function renderWithError(res, error) {
  return res.render('login-cadastro', { error: error.message });
}
