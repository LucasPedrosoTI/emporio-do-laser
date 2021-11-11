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
      Pedido.belongsToMany(models.TamanhoProduto, { through: models.PedidoProduto, foreignKey: 'pedidoId' });
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
