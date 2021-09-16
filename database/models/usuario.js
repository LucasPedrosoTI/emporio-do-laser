'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {}
  Usuario.init(
    {
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Usuario',
      paranoid: true,
    }
  );
  return Usuario;
};
