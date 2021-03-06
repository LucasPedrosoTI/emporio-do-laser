'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cupom extends Model {
        static associate(models) {
            Cupom.hasMany(models.Pedido, { foreignKey: 'cupomId' });
            Cupom.belongsToMany(models.Categoria, { through: models.CupomCategoria, foreignKey: 'cupomId' });
        }
    }
    Cupom.init({
        codigo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        taxaDeDesconto: DataTypes.DOUBLE,
        dataExpiracao: DataTypes.DATE,
        habilitado: DataTypes.BOOLEAN,
        ehPorcentagem: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Cupom',
    });

    return Cupom;
};