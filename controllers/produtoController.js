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

  listarProdutos: async (req, res, next) => {

    const produtos = await Produto.findAll({ include: [ Categoria, ImagemProduto ] });

    res.render('minha-conta-admin/meusprodutos', { produtos, menu: 'produtos' });
  },

  cadastrarProdutoForm: async (req, res) => {
    const categorias = await Categoria.findAll();
    res.render('minha-conta-admin/cadastrarproduto', { categorias, menu: 'produtos' });
  },

  cadastrarProduto: async (req, res) => {
    console.log(req.body);
    const { nomeProduto, personalizavel, categoriaId, descricao, tamanho, quantidade, peso, preco } = req.body;
    const nomeImagem = `/img/produtos/${req.file.filename}`;
    
    const produto = await Produto.create({ nomeProduto, descricao, personalizavel, categoriaId });
    await ImagemProduto.create({ nomeImagem, produtoId: produto.id });
    await TamanhoProduto.create({ tamanho, quantidade, peso, preco, produtoId: produto.id })

    res.redirect('/minha-conta/meusprodutos');
    
  },

  editarProduto: async (req, res) => {
    const { produtoId } = req.query;
    const categorias = await Categoria.findAll();

    let produto = await Produto.findByPk(produtoId);

    res.render('minha-conta-admin/editarproduto', { produto, categorias, menu: 'produtos' });
  },

  alterarProduto: async (req, res) => {
    const { id, nomeProduto, personalizavel, categoriaId, descricao } = req.body;

    const produto = await Produto.update({ nomeProduto, descricao, personalizavel, categoriaId }, { where: { id } });
    
    if(req.file){
      const nomeImagem = `/img/produtos/${req.file.filename}`;
      await ImagemProduto.update({ nomeImagem }, { where: { produtoId: id } })
    }

    res.redirect('/minha-conta/meusprodutos');
  },

  estoqueProduto: async (req, res) => {
    const { produtoId } = req.query;

    const produto = await Produto.findByPk(produtoId);
    const tamanhos = await TamanhoProduto.findAll({ where: { produtoId } });

    res.render('minha-conta-admin/estoqueproduto', { tamanhos, produto, menu: 'produtos' });
  },

  cadastrarTamanhoForm: async (req, res) => {
    const { produtoId } = req.query;

    res.render('minha-conta-admin/cadastrartamanho', { produtoId, menu: 'produtos' });
  },

  cadastrarTamanho: async (req, res) => {
    const { produtoId, tamanho, quantidade, peso, preco } = req.body;

    const produto = await Produto.findByPk(produtoId);
    const tamanhos = await TamanhoProduto.findAll({ where: { produtoId } });
    await TamanhoProduto.create({ tamanho, quantidade, peso, preco, produtoId })

    res.render('minha-conta-admin/estoqueproduto', { produto, tamanhos, menu: 'produtos' });
  },

  editarTamanho: async (req, res) => {
    const { tamanhoId } = req.query;

    let tamanho = await TamanhoProduto.findByPk(tamanhoId);

    res.render('minha-conta-admin/editartamanho', { tamanho, menu: 'produtos' });
  },

  alterarTamanho: async (req, res) => {
    const { id, produtoId, tamanho, quantidade, peso, preco } = req.body;

    await TamanhoProduto.update({ tamanho, quantidade, peso, preco }, { where: { id } });

    const produto = await Produto.findByPk(produtoId);
    const tamanhos = await TamanhoProduto.findAll({ where: { produtoId } });
    
    res.render('minha-conta-admin/estoqueproduto', { produto, tamanhos, menu: 'produtos' });
  },

};
