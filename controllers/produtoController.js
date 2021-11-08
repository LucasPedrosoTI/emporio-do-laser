const { Categoria, Produto, ImagemProduto, TamanhoProduto } = require('../database/models');
const { currencyFormatter } = require('../utils/formatter');

module.exports = {
  renderProdutos: async (req, res) => {
    const categorias = await Categoria.findAll();

    const produtos = await Produto.findAll({
      include: [TamanhoProduto, ImagemProduto],
    });

    const produtosFormatado = produtos.map(produto => ({
      ...produto,
      TamanhoProdutos: produto.TamanhoProdutos.map(tProd => ({
        ...tProd,
        preco: currencyFormatter.format(tProd.preco),
      })),
    }));

    return res.render('produtos', { categorias, produtos: produtosFormatado });
  },
};
