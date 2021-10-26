'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Usuario);
      Cliente.hasOne(models.PessoaFisica);
      Cliente.hasOne(models.PessoaJuridica);
      Cliente.hasMany(models.Endereco);
      Cliente.hasOne(models.Logo);
      Cliente.hasMany(models.Pedido);
    }
  }
  Cliente.init(
    {
      usuarioId: DataTypes.BIGINT,
      telefone: DataTypes.STRING,
      ehPessoaFisica: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Cliente',
    }
  );
  return Cliente;
};
