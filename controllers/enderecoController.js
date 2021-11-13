const { Endereco } = require('../database/models');

module.exports = {
  buscarEnderecoPorId: async (req, res) => {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(id);

    res.json({ endereco });
  },

  listarEnderecos: async (req, res) => {
    const { id: clienteId } = req.session.usuario.Cliente;

    const enderecos = await Endereco.findAll({ where: { clienteId } });

    res.render('minha-conta/enderecos', { enderecos, menu: 'enderecos' });
  },

  renderEditarEnderecos: async (req, res) => {
    const { enderecoId } = req.query;

    const endereco = await Endereco.findByPk(enderecoId);

    res.render('minha-conta/editarendereco', { endereco, menu: 'enderecos' });
  },

  cadastrarEndereco: async (req, res) => {
    const { id: clienteId } = req.session.usuario.Cliente;

    try {
      const { destinatario, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;
      await Endereco.create({ clienteId, destinatario, rua, numero, complemento, bairro, cidade, estado, cep });
    } catch (error) {
      return await renderWithError(clienteId, 'minha-conta/cadastrarendereco', error, res);
    }

    return res.redirect('/minha-conta/enderecos');
  },

  alterarEndereco: async (req, res) => {
    const { id, destinatario, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

    try {
      await Endereco.update({ destinatario, rua, numero, complemento, bairro, cidade, estado, cep }, { where: { id } });
    } catch (error) {
      const endereco = await Endereco.findByPk(id);
      res.render('minha-conta/editarendereco', { endereco, menu: 'enderecos' });
    }

    return res.redirect('/minha-conta/enderecos');
  },

  excluirEndereco: async (req, res) => {
    try {
      const { id } = req.body;

      await Endereco.destroy({ where: { id } });
    } catch (error) {
      const { id: clienteId } = req.session.usuario.Cliente;
      return await renderWithError(clienteId, 'minha-conta/enderecos', error, res);
    }

    return res.redirect('/minha-conta/enderecos');
  },
};

async function renderWithError(clienteId, view, error, res) {
  const enderecos = await Endereco.findAll({ where: { clienteId } });
  return res.render(view, { error: error.message, enderecos, menu: 'enderecos' });
}
