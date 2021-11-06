'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Categorias', [
      {
        id: 1,
        nomeCategoria: 'Cakeboard',
      },
      {
        id: 2,
        nomeCategoria: 'Topo de Bolo',
      },
      {
        id: 3,
        nomeCategoria: 'Caixa Cenário',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Categorias', null, {});
  },
};
