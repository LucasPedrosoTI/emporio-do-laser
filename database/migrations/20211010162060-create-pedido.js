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
        references: { model: 'clientes', key: 'id' },
      },
      statusPedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_pedido', key: 'id' },
      },
      subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tipoEnvioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tipo_envio', key: 'id' },
      },
      cupomId: {
        type: Sequelize.BIGINT,
        references: { model: 'cupoms', key: 'id' },
      },
      tipoPagamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tipo_pagamento', key: 'id' },
      },
      boleto: {
        type: Sequelize.BLOB,
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
