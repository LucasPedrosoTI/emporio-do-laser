'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Produto, {
        foreignKey: 'categoriaId',
      });
      Categoria.belongsToMany(models.Cupom, { through: models.CupomCategoria, foreignKey: 'categoriaId' });
    }
  }
  Categoria.init(
    {
      nomeCategoria: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'Categorias',
    }
  );
  return Categoria;
};
