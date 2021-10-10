'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TamanhoProduto extends Model {
    static associate(models) {
      TamanhoProduto.belongsTo(models.Produto);
    }
  }
  TamanhoProduto.init(
    {
      produtoId: DataTypes.BIGINT,
      quantidade: DataTypes.INTEGER,
      peso: DataTypes.DOUBLE,
      preco: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'TamanhoProduto',
    }
  );
  return TamanhoProduto;
};
