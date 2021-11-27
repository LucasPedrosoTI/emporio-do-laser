'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PessoaJuridica extends Model {
        static associate(models) {
            PessoaJuridica.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        }
    }
    PessoaJuridica.init({
        cnpj: DataTypes.STRING,
        razao_social: DataTypes.STRING,
        // clienteId: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'PessoaJuridica',
        tableName: 'pessoas_juridicas',
    });
    return PessoaJuridica;
};