'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TipoPagamento extends Model {
        static associate(models) {
            TipoPagamento.hasMany(models.Pedido, { foreignKey: 'tipoPagamentoId' });
        }
    }
    TipoPagamento.init({
        nomeTipoPagamento: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TipoPagamento',
        tableName: 'Tipo_Pagamento',
    });
    return TipoPagamento;
};