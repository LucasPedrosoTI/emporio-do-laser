'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tamanho_Produtos', 'preco', Sequelize.DECIMAL(10, 2));
    await queryInterface.addColumn('Tamanho_Produtos', 'deletedAt', Sequelize.DATE);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tamanho_Produtos', 'preco', Sequelize.DECIMAL);
    await queryInterface.removeColumn('Tamanho_Produtos', 'deletedAt');
  },
};
