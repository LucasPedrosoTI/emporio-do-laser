'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    static associate(models) {
      Endereco.belongsTo(models.Cliente);
    }
  }
  Endereco.init(
    {
      clienteId: DataTypes.BIGINT,
      rua: DataTypes.STRING,
      numero: DataTypes.NUMBER,
      complemento: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      cep: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Endereco',
    }
  );
  return Endereco;
};
