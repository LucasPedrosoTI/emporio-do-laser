'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Usuario);
    }
  }
  Cliente.init(
    {
      usuarioId: DataTypes.BIGINT,
      telefone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cliente',
    }
  );
  return Cliente;
};
