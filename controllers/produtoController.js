const { Categoria } = require('../database/models');

module.exports = {
  renderProdutos: async (req, res) => {
    const categorias = await Categoria.findAll();

    return res.render('produtos', { categorias });
  },
};
