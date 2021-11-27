'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TipoEnvio extends Model {
        static associate(models) {
            TipoEnvio.hasMany(models.Pedido, { foreignKey: 'tipoEnvioId' });
        }
    }
    TipoEnvio.init({
        nomeTipoEnvio: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TipoEnvio',
        tableName: 'Tipo_Envio',
    });
    return TipoEnvio;
};