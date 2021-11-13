'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Enderecos', 'deletedAt', Sequelize.DATE);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('Enderecos', 'deletedAt');
  },
};
