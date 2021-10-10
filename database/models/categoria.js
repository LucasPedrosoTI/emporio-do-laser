'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Produto);
    }
  }
  Categoria.init(
    {
      nomeCategoria: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Categoria',
    }
  );
  return Categoria;
};
