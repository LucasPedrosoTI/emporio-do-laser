const { Categoria, Produto, ImagemProduto, TamanhoProduto } = require('../database/models');
const { currencyFormatter } = require('../utils/formatter');
const { Op } = require('sequelize');

module.exports = {
  renderProdutos: async (req, res) => {
    const { nomeProduto, categoriaId } = req.query;

    const categorias = await Categoria.findAll();

    const produtos = await Produto.findAll({
      where: {
        categoriaId: categoriaId || categorias.map(c => c.id),
        nomeProduto: {
          [Op.substring]: nomeProduto || '',
        },
      },
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

  listarProdutos: async (req, res, next) => {
    const produtos = await Produto.findAll({ include: [Categoria, ImagemProduto, TamanhoProduto], paranoid: false });

    res.render('minha-conta-admin/meusprodutos', { produtos, menu: 'produtos' });
  },

  cadastrarProdutoForm: async (req, res) => {
    const categorias = await Categoria.findAll();
    res.render('minha-conta-admin/cadastrarproduto', { categorias, menu: 'produtos' });
  },

  cadastrarProduto: async (req, res) => {
    const { nomeProduto, personalizavel, categoriaId, descricao, tamanho, quantidade, peso, preco } = req.body;
    const nomeImagem = `/img/produtos/${req.file.filename}`;

    const produto = await Produto.create({ nomeProduto, descricao, personalizavel, categoriaId });
    await ImagemProduto.create({ nomeImagem, produtoId: produto.id });
    await TamanhoProduto.create({ tamanho, quantidade, peso, preco, produtoId: produto.id });

    res.redirect('/minha-conta/meusprodutos');
  },

  renderEditarProduto: async (req, res) => {
    const { produtoId } = req.query;
    const categorias = await Categoria.findAll();

    const produto = await obterProdutoPorId(produtoId);

    res.render('minha-conta-admin/editarproduto', { produto, categorias, menu: 'produtos' });
  },

  alterarProduto: async (req, res) => {
    const { id, nomeProduto, personalizavel, categoriaId, descricao } = req.body;

    await Produto.update({ nomeProduto, descricao, personalizavel, categoriaId }, { where: { id } });

    if (req.file) {
      const fs = require('fs');
      const path = require('path');
      const public = path.join('public');
      const nomeImagem = `/img/produtos/${req.file.filename}`;

      let imagem = await ImagemProduto.findOne({ where: { produtoId: id } });

      await ImagemProduto.update({ nomeImagem }, { where: { id: imagem.id } });

      // deletar arquivo antigo
      fs.unlink(public + '' + imagem.nomeImagem, async function (err) {
        if (err) throw err;
        console.log(public + '' + imagem);
        console.log('Arquivo deletado!');
      });
    }

    res.redirect('/minha-conta/meusprodutos');
  },

  renderTamanhos: async (req, res) => {
    const { produtoId } = req.query;
    await fRenderTamanhos(produtoId, res);
  },

  cadastrarTamanhoForm: async (req, res) => {
    const { produtoId } = req.query;

    res.render('minha-conta-admin/cadastrartamanho', { produtoId, menu: 'produtos' });
  },

  cadastrarTamanho: async (req, res) => {
    const { produtoId, tamanho, quantidade, peso, preco } = req.body;

    const produto = await Produto.findByPk(produtoId);
    const tamanhos = await TamanhoProduto.findAll({ where: { produtoId } });
    await TamanhoProduto.create({ tamanho, quantidade, peso, preco, produtoId });

    res.render('minha-conta-admin/tamanhos', { produto, tamanhos, menu: 'produtos' });
  },

  renderEditarTamanho: async (req, res) => {
    const { tamanhoId } = req.query;

    const tamanho = await TamanhoProduto.findByPk(tamanhoId, { paranoid: false });

    res.render('minha-conta-admin/editartamanho', { tamanho, menu: 'produtos' });
  },

  alterarTamanho: async (req, res) => {
    const { id, produtoId, tamanho, peso, preco } = req.body;

    await TamanhoProduto.update({ tamanho, peso, preco }, { where: { id } });

    const produto = await Produto.findByPk(produtoId);
    const tamanhos = await TamanhoProduto.findAll({ where: { produtoId } });

    res.render('minha-conta-admin/tamanhos', { produto, tamanhos, menu: 'produtos' });
  },

  alterarEstoque: async (req, res) => {
    console.log(req.body);
    let { id, estoque, entrada } = req.body;

    if (entrada == null || entrada.trim() == '') {
      entrada = 0;
    }

    let quantidade = parseInt(estoque) + parseInt(entrada);

    await TamanhoProduto.update({ quantidade }, { where: { id } });

    res.redirect('/minha-conta/meusprodutos');
  },

  habilitarDesabilitarProduto: async (req, res) => {
    const { produtoId, acao } = req.body;

    try {
      if (acao === 'habilitar') {
        await Produto.restore({
          where: {
            id: produtoId,
          },
        });
      } else {
        await Produto.destroy({
          where: {
            id: produtoId,
          },
        });
      }
    } catch (error) {
      const produtos = await Produto.findAll({ include: [Categoria, ImagemProduto, TamanhoProduto], paranoid: false });
      res.render('minha-conta-admin/meusprodutos', { produtos, menu: 'produtos', error: error.message });
    }

    res.redirect('/minha-conta/meusprodutos');
  },

  habilitarDesabilitarTamanho: async (req, res) => {
    const { tamanhoId, produtoId, acao } = req.body;

    try {
      if (acao === 'habilitar') {
        await TamanhoProduto.restore({
          where: {
            id: tamanhoId,
          },
        });
      } else {
        await TamanhoProduto.destroy({
          where: {
            id: tamanhoId,
          },
        });
      }
    } catch (error) {
      await fRenderTamanhos(produtoId, res);
    }

    res.redirect(`/minha-conta/tamanhos?produtoId=${produtoId}`);
  },
};

async function fRenderTamanhos(produtoId, res) {
  const produto = await obterProdutoPorId(produtoId);
  const tamanhos = await TamanhoProduto.findAll({ where: { produtoId }, paranoid: false });
  res.render('minha-conta-admin/tamanhos', { tamanhos, produto, menu: 'produtos' });
}
async function obterProdutoPorId(produtoId) {
  return await Produto.findByPk(produtoId, { paranoid: false });
}
