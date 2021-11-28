'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pedido extends Model {
        static associate(models) {
            Pedido.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
            Pedido.belongsTo(models.StatusPedido, { foreignKey: 'statusPedidoId' });
            Pedido.belongsTo(models.TipoEnvio, { foreignKey: 'tipoEnvioId' });
            Pedido.belongsTo(models.Cupom, { foreignKey: 'cupomId' });
            Pedido.belongsTo(models.TipoPagamento, { foreignKey: 'tipoPagamentoId' });
            Pedido.belongsTo(models.Endereco, { foreignKey: 'enderecoId' });
            Pedido.belongsToMany(models.TamanhoProduto, { through: models.PedidoProduto, foreignKey: 'pedidoId' });

            Pedido.findAllWithAllInformation = async(where, order, offset = 0, limit = null) => {
                return await Pedido.findAndCountAll({
                    [where && 'where']: where,
                    include: [
                        models.TipoPagamento,
                        models.StatusPedido,
                        models.TipoEnvio,
                        { model: models.Endereco, paranoid: false },
                        models.Cupom,
                        {
                            model: models.TamanhoProduto,
                            include: [{ model: models.Produto, paranoid: false }],
                            paranoid: false,
                        },
                        {
                            model: models.Cliente,
                            include: [{
                                model: models.PessoaFisica,
                                attributes: ['nome', 'cpf']
                            }, {
                                model: models.PessoaJuridica,
                                attributes: ['razao_social', 'cnpj']
                            }],
                        }
                    ],
                    [order && 'order']: order,
                    [offset && 'offset']: offset,
                    [limit && 'limit']: limit
                });
            };
        }
    }
    Pedido.init({
        subtotal: DataTypes.DECIMAL,
        boleto: DataTypes.STRING,
        codigoRastreio: DataTypes.STRING,
        // clienteId: DataTypes.BIGINT,
        // statusPedidoId: DataTypes.INTEGER,
        // tipoEnvioId: DataTypes.INTEGER,
        // cupomId: DataTypes.BIGINT,
        // tipoPagamentoId: DataTypes.INTEGER,
        // enderecoId: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Pedido',
    });
    return Pedido;
};