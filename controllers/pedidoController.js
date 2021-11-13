const { Pedido, TipoPagamento, TipoEnvio, StatusPedido, Produto, TamanhoProduto, Endereco, Cupom } = require('../database/models');

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
    });

    res.render('minha-conta/pedidos', { pedidos, menu: 'pedidos' });
  },
};
