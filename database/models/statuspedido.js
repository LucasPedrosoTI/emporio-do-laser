'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StatusPedido extends Model {
        static associate(models) {
            StatusPedido.hasMany(models.Pedido, { foreignKey: 'statusPedidoId' });
        }
    }
    StatusPedido.init({
        descricao: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'StatusPedido',
        tableName: 'Status_Pedido',
    });
    return StatusPedido;
};