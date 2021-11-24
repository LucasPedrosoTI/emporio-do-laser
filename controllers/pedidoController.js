const { Pedido, TipoPagamento, TipoEnvio, StatusPedido, Produto, TamanhoProduto, Endereco, Cupom, PedidoProduto } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
  listarPedidos: async (req, res) => {
    const clienteId = req.session.usuario.Cliente.id;

    const pedidos = await Pedido.findAllWithAllInformation({ clienteId }, [['id', 'DESC']]);

    res.render('minha-conta/pedidos', { pedidos, menu: 'pedidos' });
  },

  fecharPedido: async function (req, res) {
    const { id: clienteId } = req.session.usuario.Cliente;
    const { subtotal, tipoEnvioId, tipoPagamentoId, enderecoId, cupomId, cardName, cardNumber, cardDate, cardCvv } = req.body;
    const { carrinho } = req.session;

    const cardData = { cardName, cardNumber, cardDate, cardCvv };

    try {
      validarPedido(subtotal, tipoEnvioId, tipoPagamentoId, enderecoId, carrinho, cardData);

      const tamanhos = carrinho.map(item => ({
        tamanhoId: item.tamanhoProduto.id,
        quantidade: parseInt(item.qtd),
      }));
      const tamanhoIds = tamanhos.map(t => t.tamanhoId);
      const produtoIds = carrinho.map(item => item.produto.id);

      await validarTamanhos(carrinho, tamanhoIds);
      await validarQuantidades(tamanhoIds, tamanhos);
      await validarProdutos(produtoIds);

      const pedido = await Pedido.create({
        clienteId,
        statusPedidoId: 1,
        subtotal,
        tipoEnvioId,
        cupomId: cupomId ? cupomId : null,
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
      console.log(error);
      const enderecos = await Endereco.findAll({ where: { clienteId } });
      const tiposPagamento = await TipoPagamento.findAll();
      const tiposEnvio = await TipoEnvio.findAll();
      return res.render('pagamento', { enderecos, tiposPagamento, tiposEnvio, error: error.message });
    }

    return res.redirect('/minha-conta/pedidos');
  },

  cancelarPedido: async (req, res) => {
    const { id: clienteId } = req.session.usuario.Cliente;
    const { pedidoId } = req.body;
    const statusPedidoId = 6;

    await Pedido.update({ statusPedidoId }, { where: { id: pedidoId, clienteId: clienteId } });

    res.redirect('/minha-conta/pedidos');
  },

  renderHistoricoPedido: async (req, res) => {
    let { filtro } = req.query;
    let status;

    if (filtro == null || filtro == 'Todos') {
      filtro = 'Todos';
      status = [5, 6];
    } else {
      status = filtro;
    }

    const pedidos = await Pedido.findAllWithAllInformation({ statusPedidoId: status }, [['id', 'DESC']]);

    const pedidoStatus = await StatusPedido.findAll();

    res.render('minha-conta-admin/historicopedidos', { pedidos, filtro, pedidoStatus, menu: 'historico' });
  },

  renderGerenciarPedidos: async (req, res) => {
    let { filtro } = req.query;
    let status;

    if (filtro == null || filtro == 'Todos') {
      filtro = 'Todos';
      status = [1, 2, 3, 4];
    } else {
      status = filtro;
    }

    const pedidos = await Pedido.findAllWithAllInformation({ statusPedidoId: status }, [['id', 'ASC']]);

    const pedidoStatus = await StatusPedido.findAll();

    res.render('minha-conta-admin/pedidos', { pedidos, filtro, pedidoStatus, menu: 'pedidos' });
  },

  alterarStatusPedido: async (req, res) => {
    const { pedidoId, statusPedidoId } = req.body;

    await Pedido.update({ statusPedidoId }, { where: { id: pedidoId } });

    res.redirect('/minha-conta/gerenciarpedidos');
  },
};

async function validarProdutos(produtoIds) {
  const produtosDesabilitados = await Produto.findAll({
    paranoid: false,
    where: {
      id: produtoIds,
      deletedAt: {
        [Op.not]: null,
      },
    },
  });

  if (produtosDesabilitados && produtosDesabilitados.length > 0) {
    const produtosTxt = produtosDesabilitados.map(produto => `\n${produto.nomeProduto}`);
    throw new Error(`Os produtos abaixo não estão mais disponíveis: ${produtosTxt}`);
  }
}

async function validarQuantidades(tamanhoIds, tamanhos) {
  const tamanhosBanco = await TamanhoProduto.findAll({
    where: {
      id: tamanhoIds,
    },
    include: [Produto],
  });

  tamanhos.forEach(tamanho => {
    const tBanco = tamanhosBanco.find(tam => tam.id == tamanho.tamanhoId);

    if (tBanco.quantidade - tamanho.quantidade < 0) {
      throw new Error(
        `Quantidade insuficiente em estoque para o produto ${tBanco.Produto.nomeProduto} - ${tBanco.tamanho}. Disponível: \n${tBanco.quantidade} unidade(s) \nPedido: ${tamanho.quantidade} unidade(s)`
      );
    }
  });
}

async function validarTamanhos(tamanhos) {
  const tamanhosDesabilitados = await TamanhoProduto.findAll({
    where: {
      id: tamanhos,
      deletedAt: {
        [Op.not]: null,
      },
    },
    paranoid: false,
    include: [Produto],
  });

  if (tamanhosDesabilitados && tamanhosDesabilitados.length > 0) {
    const produtosTxt = tamanhosDesabilitados.map(tamanho => `\n${tamanho.Produto.nomeProduto} - ${tamanho.tamanho}`);
    throw new Error(`Os produtos abaixo não estão mais disponíveis: ${produtosTxt}`);
  }
}

function validarPedido(subtotal, tipoEnvioId, tipoPagamentoId, enderecoId, carrinho, cardData) {
  if (!enderecoId) throw new Error('Cadastre um endereço antes de prosseguir');
  if (!tipoEnvioId) throw new Error('Selecione um tipo de envio');
  if (!tipoPagamentoId) throw new Error('Selecione um tipo de pagamento');
  if (!carrinho) throw new Error('Não há itens no carrinho');
  if (subtotal <= 0) throw new Error('O total da compra não poder ser menor ou igual a 0');

  if (tipoPagamentoId == 1) {
    Object.values(cardData).forEach(data => {
      if (!data) throw new Error('Todos os campos de cartão de crédito são obrigatórios');
    });
  }
}
