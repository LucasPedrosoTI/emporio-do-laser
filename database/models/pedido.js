'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente);
      Pedido.belongsTo(models.StatusPedido);
      Pedido.belongsTo(models.Logo);
      Pedido.belongsTo(models.TipoEnvio);
      Pedido.belongsTo(models.Cupom);
      Pedido.belongsTo(models.TipoPagamento);
    }
  }
  Pedido.init(
    {
      clienteId: DataTypes.BIGINT,
      statusPedidoId: DataTypes.INTEGER,
      logoId: DataTypes.BIGINT,
      subtotal: DataTypes.DECIMAL,
      tipoEnvioId: DataTypes.INTEGER,
      cupomId: DataTypes.BIGINT,
      tipoPagamentoId: DataTypes.INTEGER,
      boleto: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: 'Pedido',
    }
  );
  return Pedido;
};
