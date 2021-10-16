'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CupomCategoria extends Model {
    static associate(models) {
      CupomCategoria.belongsTo(models.Categoria);
      CupomCategoria.belongsTo(models.Cupom);
    }
  }
  CupomCategoria.init(
    {
      cupomId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Cupoms',
          key: 'id',
        },
      },
      categoriaId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Categorias',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CupomCategoria',
      tableName: 'Cupoms_Categorias',
    }
  );
  return CupomCategoria;
};
