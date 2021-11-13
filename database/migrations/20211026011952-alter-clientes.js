'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clientes', 'ehPessoaFisica', Sequelize.BOOLEAN, {
      defaultValue: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clientes', 'ehPessoaFisica');
  },
};
