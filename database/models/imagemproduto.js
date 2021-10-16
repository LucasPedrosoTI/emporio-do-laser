'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImagemProduto extends Model {
    static associate(models) {
      ImagemProduto.belongsTo(models.Produto);
    }
  }
  ImagemProduto.init(
    {
      nomeImagem: DataTypes.STRING,
      tipo: DataTypes.STRING,
      arquivo: DataTypes.BLOB,
      produtoId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'ImagemProduto',
      tableName: 'Imagens_Produtos',
    }
  );
  return ImagemProduto;
};
