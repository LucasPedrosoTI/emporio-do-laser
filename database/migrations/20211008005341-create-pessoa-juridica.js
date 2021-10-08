'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pessoas_Juridicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cnpj: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clienteId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
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
    await queryInterface.dropTable('Pessoas_Juridicas');
  },
};
