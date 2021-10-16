'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cupoms_Categorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cupomId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'cupoms', key: 'id' },
      },
      categoriaId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'categorias', key: 'id' },
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
    await queryInterface.dropTable('Cupoms_Categorias');
  },
};
