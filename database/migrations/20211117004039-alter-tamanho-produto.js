'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tamanho_Produtos', 'preco', Sequelize.DECIMAL(10, 2));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tamanho_Produtos', 'preco', Sequelize.DECIMAL);
  },
};
