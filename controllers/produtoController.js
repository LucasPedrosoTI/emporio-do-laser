const { Categoria, Produto, ImagemProduto, TamanhoProduto } = require('../database/models');

module.exports = {
  renderProdutos: async (req, res) => {
    const categorias = await Categoria.findAll();

    const produtos = await Produto.findAll({
      include: [TamanhoProduto, ImagemProduto],
    });

    return res.render('produtos', { categorias, produtos });
  },
};
