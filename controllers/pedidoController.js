const { Pedido, TipoPagamento, TipoEnvio, StatusPedido, Produto, TamanhoProduto, Endereco, Cupom, PedidoProduto } = require('../database/models');

module.exports = {
  listarPedidos: async (req, res) => {
    const clienteId = req.session.usuario.Cliente.id;
    const pedidos = await Pedido.findAll({
      where: { clienteId },
      include: [
        TipoPagamento,
        StatusPedido,
        TipoEnvio,
        { model: Endereco, paranoid: false },
        Cupom,
        {
          model: TamanhoProduto,
          include: [Produto],
        },
      ],
      order: [['id', 'DESC']],
    });

    res.render('minha-conta/pedidos', { pedidos, menu: 'pedidos' });
  },

  fecharPedido: async function (req, res) {
    const { id: clienteId } = req.session.usuario.Cliente;
    const { subtotal, tipoEnvioId, tipoPagamentoId, enderecoId, cupomId, cardName, cardNumber, cardDate, cardCvv } = req.body;
    const { carrinho } = req.session;

    const cardData = { cardName, cardNumber, cardDate, cardCvv };

    try {
      validarPedido(subtotal, tipoEnvioId, tipoPagamentoId, enderecoId, carrinho, cardData);

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

  listAllPedidos: async (req, res) => {
    const { filtro } = req.query;
    const pedidos = await Pedido.findAll({
      include: [
        TipoPagamento,
        StatusPedido,
        TipoEnvio,
        { model: Endereco, paranoid: false },
        Cupom,
        {
          model: TamanhoProduto,
          include: [Produto],
        },
      ],
      order: [['id', 'DESC']],
    });

    const pedidoStatus = await StatusPedido.findAll();

    res.render('minha-conta-admin/historicopedidos', { pedidos, filtro, pedidoStatus, menu: 'historico' });
  },

};

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
