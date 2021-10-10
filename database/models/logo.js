'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logo extends Model {
    static associate(models) {
      Logo.belongsTo(models.Cliente);
    }
  }
  Logo.init(
    {
      nomeImagem: DataTypes.STRING,
      tipo: DataTypes.STRING,
      arquivo: DataTypes.BLOB,
      clienteId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Logo',
    }
  );
  return Logo;
};
