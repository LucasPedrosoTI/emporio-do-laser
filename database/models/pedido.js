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
      Pedido.belongsToMany(models.Produto, { through: 'Pedidos_Produtos' });
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
      boleto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pedido',
    }
  );
  return Pedido;
};
