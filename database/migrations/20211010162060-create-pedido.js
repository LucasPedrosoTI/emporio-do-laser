'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      clienteId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'Clientes', key: 'id' },
      },
      statusPedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Status_Pedido', key: 'id' },
      },
      subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      enderecoId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'Enderecos', key: 'id' },
      },
      tipoEnvioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Envio', key: 'id' },
      },
      cupomId: {
        type: Sequelize.BIGINT,
        references: { model: 'Cupoms', key: 'id' },
      },
      tipoPagamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tipo_Pagamento', key: 'id' },
      },
      boleto: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  },
};
