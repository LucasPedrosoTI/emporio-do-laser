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
      id: produto.id,
      nomeProduto: produto.nomeProduto,
      TamanhoProdutos: produto.TamanhoProdutos.map(tProd => ({
        ...tProd,
        preco: currencyFormatter.format(tProd.preco),
      })),
    }));

    return res.render('produtos', { categorias, produtos: produtosFormatado });
  },

  renderProduto: async (req, res) => {
    const { id } = req.params;

    const produto = await Produto.findByPk(id, {
      include: [TamanhoProduto, ImagemProduto],
    });

    res.render('produto', { produto });
  },

  getTamanhoById: async (req, res) => {
    const { id } = req.params;

    const tamanhoProduto = await TamanhoProduto.findByPk(id);

    tamanhoProduto.preco = currencyFormatter.format(tamanhoProduto.preco);

    return res.json(tamanhoProduto);
  },
};
