'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PessoaFisica extends Model {
        static associate(models) {
            PessoaFisica.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        }
    }
    PessoaFisica.init({
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        // clienteId: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'PessoaFisica',
        tableName: 'pessoas_fisicas',
    });
    return PessoaFisica;
};