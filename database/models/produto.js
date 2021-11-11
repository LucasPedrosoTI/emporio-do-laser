'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
      });
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
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Produto',
      paranoid: true,
    }
  );
  return Produto;
};
