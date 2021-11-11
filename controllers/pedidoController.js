const { Pedido, TipoPagamento, TipoEnvio, StatusPedido, PedidoProduto, Categoria, Produto, ImagemProduto, TamanhoProduto, Usuario, Cliente, PessoaJuridica, PessoaFisica, Endereco }  = require('../database/models');

const { currencyFormatter } = require('../utils/formatter');

module.exports = {

    listarPedidos: async (req, res) => {
        
        const clienteId = req.session.usuario.Cliente.id;
        const pedidos = await Pedido.findAll({ where: { clienteId }, include: [ TipoPagamento, StatusPedido, TipoEnvio ] });

        res.render('minha-conta/pedidos', { pedidos, menu: 'pedidos' });
   
    },

}