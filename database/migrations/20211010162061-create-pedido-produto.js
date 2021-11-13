'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos_Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      pedidoId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'Pedidos', key: 'id' },
      },
      tamanhoProdutoId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'Tamanho_Produtos', key: 'id' },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comLogomarca: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Pedidos_Produtos');
  },
};
