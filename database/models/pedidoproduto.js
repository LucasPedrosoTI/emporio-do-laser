'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoProduto extends Model {
    static associate(models) {}
  }
  PedidoProduto.init(
    {
      pedidoId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Pedidos',
          key: 'id',
        },
      },

      produtoId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Produtos',
          key: 'id',
        },
      },

      quantidade: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PedidoProduto',
      tableName: 'Pedidos_Produtos',
    }
  );
  return PedidoProduto;
};
