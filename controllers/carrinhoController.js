const { Endereco, Produto, TamanhoProduto, ImagemProduto, Pedido, PedidoProduto, TipoPagamento, TipoEnvio } = require('../database/models');

module.exports = {
  listar: (req, res) => {
    if (!req.session.carrinho)
      req.session.carrinho = [
        {
          produto: {
            id: 2,
            nomeProduto: 'Cakeboard Quadrado',
            descricao:
              'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
            personalizavel: true,
            categoriaId: 1,
            deletedAt: null,
            createdAt: '2021-11-11T01:06:31.000Z',
            updatedAt: '2021-11-11T01:06:31.000Z',
            ImagemProdutos: [
              { id: 2, nomeImagem: '/img/produtos/cake2.jpg', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
              { id: 3, nomeImagem: '/img/produtos/cake2.png', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
            ],
          },
          tamanhoProduto: { id: 5, produtoId: 2, tamanho: '25 cm', quantidade: 20, peso: 0.75, preco: '5', createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
          qtd: '4',
          comLogomarca: true,
        },
        {
          produto: {
            id: 2,
            nomeProduto: 'Cakeboard Quadrado',
            descricao:
              'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
            personalizavel: true,
            categoriaId: 1,
            deletedAt: null,
            createdAt: '2021-11-11T01:06:31.000Z',
            updatedAt: '2021-11-11T01:06:31.000Z',
            ImagemProdutos: [
              { id: 2, nomeImagem: '/img/produtos/cake2.jpg', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
              { id: 3, nomeImagem: '/img/produtos/cake2.png', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
            ],
          },
          tamanhoProduto: { id: 4, produtoId: 2, tamanho: '20 cm', quantidade: 10, peso: 0.5, preco: '5', createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
          qtd: '2',
          comLogomarca: false,
        },
        {
          produto: {
            id: 1,
            nomeProduto: 'Cakeboard Redondo',
            descricao:
              'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
            personalizavel: true,
            categoriaId: 1,
            deletedAt: null,
            createdAt: '2021-11-11T01:06:31.000Z',
            updatedAt: '2021-11-11T01:06:31.000Z',
            ImagemProdutos: [{ id: 1, nomeImagem: '/img/produtos/cake1.jpg', produtoId: 1, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 1 }],
          },
          tamanhoProduto: { id: 1, produtoId: 1, tamanho: '20 cm', quantidade: 50, peso: 0.5, preco: '4', createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 1 },
          qtd: '2',
          comLogomarca: true,
        },
      ];

    return res.json(req.session.carrinho);
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

  pagamento: async (req, res) => {
    const { id: clienteId } = req.session.usuario.Cliente;
    const enderecos = await Endereco.findAll({ where: { clienteId } });
    const tiposPagamento = await TipoPagamento.findAll();
    const tiposEnvio = await TipoEnvio.findAll();

    res.render('pagamento', { enderecos, tiposPagamento, tiposEnvio });
  },

  addAoCarrinho: async (req, res) => {
    const { produtoId, quantidade, tamanhoProduto: tamanhoProdutoId, comLogomarca } = req.body;
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
      req.session.carrinho.push({ produto, tamanhoProduto, qtd: quantidade, comLogomarca: !!comLogomarca });
    }

    res.redirect('/carrinho').json(req.sesion.carrinho);
  },

  fecharPedido: async (req, res) => {
    const { id: clienteId } = req.session.usuario.Cliente;
    const { subtotal, tipoEnvioId, tipoPagamentoId, cupomId, enderecoId } = req.body;
    const { carrinho } = req.session;

    try {
      const pedido = await Pedido.create({
        clienteId,
        statusPedidoId: 1,
        subtotal,
        tipoEnvioId,
        cupomId,
        tipoPagamentoId,
        enderecoId,
      });

      await PedidoProduto.bulkCreate(
        carrinho.map(item => {
          return {
            pedidoId: pedido.id,
            tamanhoProdutoId: item.tamanhoProduto.id,
            quantidade: item.qtd,
            comLogomarca: item.comLogomarca,
          };
        })
      );

      carrinho.forEach(async item => {
        await TamanhoProduto.update(
          {
            quantidade: parseInt(item.tamanhoProduto.quantidade) - parseInt(item.qtd),
          },
          {
            where: {
              id: item.tamanhoProduto.id,
            },
          }
        );
      });

      req.session.carrinho = [];
    } catch (error) {
      const enderecos = await Endereco.findAll({ where: { clienteId } });
      const tiposPagamento = await TipoPagamento.findAll();
      const tiposEnvio = await TipoEnvio.findAll();
      return res.render('pagamento', { enderecos, tiposPagamento, tiposEnvio, error: error.message });
    }

    return res.redirect('/minha-conta/pedidos');
  },
};
