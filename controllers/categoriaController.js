const { Categoria } = require('../database/models');
const { currencyFormatter } = require('../utils/formatter');

module.exports = {
  listarCategorias: async (req, res) => {
    res.render('minha-conta-admin/categorias', { menu: 'categorias' });
  },

  cadastrarCategorias: async (req, res) => {
    
  },

};
