'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente);
      Pedido.belongsTo(models.StatusPedido);
      Pedido.belongsTo(models.TipoEnvio);
      Pedido.belongsTo(models.Cupom);
      Pedido.belongsTo(models.TipoPagamento);
      Pedido.belongsTo(models.Endereco);
      Pedido.belongsToMany(models.TamanhoProduto, { through: models.PedidoProduto, foreignKey: 'pedidoId' });

      Pedido.findAllWithAllInformation = async (where, order) => {
        return await Pedido.findAll({
          [where && 'where']: where,
          include: [
            models.TipoPagamento,
            models.StatusPedido,
            models.TipoEnvio,
            { model: models.Endereco, paranoid: false },
            models.Cupom,
            {
              model: models.TamanhoProduto,
              include: [{ model: models.Produto, paranoid: false }],
            },
          ],
          [order && 'order']: order,
        });
      };
    }
  }
  Pedido.init(
    {
      clienteId: DataTypes.BIGINT,
      statusPedidoId: DataTypes.INTEGER,
      subtotal: DataTypes.DECIMAL,
      tipoEnvioId: DataTypes.INTEGER,
      cupomId: DataTypes.BIGINT,
      tipoPagamentoId: DataTypes.INTEGER,
      enderecoId: DataTypes.BIGINT,
      boleto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pedido',
    }
  );
  return Pedido;
};
