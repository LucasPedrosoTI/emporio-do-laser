'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tipo_envio', [
      {
        id: 1,
        opcao1: Correios,
      },
      {
        id: 2,
        opcao2: ClickEntregas,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Tipo_envio', null, {});
  },
};
