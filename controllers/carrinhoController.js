const { Endereco, Produto, TamanhoProduto, ImagemProduto } = require('../database/models');

module.exports = {
  listar: (req, res) => {
    let carrinho = req.session.carrinho;

    if (!carrinho) carrinho = [];

    return res.json(carrinho);
  },

  excluir: (req, res) => {
    const { carrinho } = req.session;

    carrinho.forEach((item, index) => {
      if (item.tamanhoProduto.id === parseInt(req.body.id)) {
        carrinho.splice(index, 1);
      }
    });

    return res.json(carrinho);
  },

  alterarQtd: (req, res) => {
    if (req.session.carrinho) {
      if (req.body.id && !isNaN(req.body.id) && req.body.qtd && !isNaN(req.body.qtd) && req.body.qtd > 0) {
        const { id, qtd } = req.body;
        const { carrinho } = req.session;

        carrinho.forEach(item => {
          if (item.tamanhoProduto.id === parseInt(id)) {
            item.qtd = parseInt(qtd);
          }
        });

        return res.json(req.session.carrinho);
      }
    } else {
      return res.json();
    }
  },

  pagamento: (req, res) => {
    let clienteId = req.session.usuario.Cliente.id;
    Endereco.findAll({ where: { clienteId } }).then(function (enderecos) {
      res.render('pagamento', { title: 'Empório do Laser - Pagamento', enderecos: enderecos });
    });
  },

  addAoCarrinho: async (req, res) => {
    const { produtoId, quantidade, tamanhoProduto: tamanhoProdutoId } = req.body;
    let productOnCart = false;

    if (!req.session.carrinho) {
      req.session.carrinho = [];
    }

    const produto = await Produto.findByPk(produtoId, {
      include: [ImagemProduto],
    });

    const tamanhoProduto = await TamanhoProduto.findByPk(tamanhoProdutoId);

    req.session.carrinho.forEach(item => {
      if (item.tamanhoProduto.id === tamanhoProduto.id) {
        item.qtd = parseInt(item.qtd) + parseInt(quantidade);
        productOnCart = true;
      }
    });

    if (!productOnCart) {
      req.session.carrinho.push({ produto, tamanhoProduto, qtd: quantidade });
    }

    res.redirect('/carrinho').json(req.sesion.carrinho);
  },
};
