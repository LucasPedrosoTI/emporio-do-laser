const { Categoria } = require('../database/models');
const { currencyFormatter } = require('../utils/formatter');

module.exports = {
  listarCategorias: async (req, res) => {
    
    const categorias = await Categoria.findAll();    

    res.render('minha-conta-admin/categorias', { categorias, menu: 'categorias' });
  },

  cadastrarCategoria: async (req, res) => {
    const { nomeCategoria } = req.body;

    await Categoria.create({ nomeCategoria });

    res.redirect('/minha-conta/categorias');
  },

  alterarCategoria: async (req, res) => {
    const { id, nomeCategoria } = req.body;

    await Categoria.update({ nomeCategoria }, { where: { id } });

    res.redirect('/minha-conta/categorias');
  },

};
