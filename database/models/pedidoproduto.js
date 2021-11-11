'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoProduto extends Model {
    // static associate(models) {
    //   PedidoProduto.belongsTo(models.Pedido, {});
    //   PedidoProduto.belongsTo(models.Produto);
    // }
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

      tamanhoProdutoId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Tamanho_Produtos',
          key: 'id',
        },
      },

      quantidade: DataTypes.INTEGER,
      comLogomarca: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'PedidoProduto',
      tableName: 'Pedidos_Produtos',
    }
  );
  return PedidoProduto;
};
