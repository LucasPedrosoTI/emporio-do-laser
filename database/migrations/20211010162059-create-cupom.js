'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cupoms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      codigo: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taxaDeDesconto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dataExpiracao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      habilitado: {
        type: Sequelize.BOOLEAN,
      },
      ehPorcentagem: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Cupoms');
  },
};
