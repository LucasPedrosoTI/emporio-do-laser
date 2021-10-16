'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsTo(models.Categoria);
      Produto.hasMany(models.TamanhoProduto);
      Produto.hasMany(models.ImagemProduto);
    }
  }
  Produto.init(
    {
      nomeProduto: DataTypes.STRING,
      descricao: DataTypes.STRING,
      personalizavel: DataTypes.BOOLEAN,
      categoriaId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Produto',
    }
  );
  return Produto;
};
