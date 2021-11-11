'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tipo_envio', [
      {
        id: 1,
        nomeTipoEnvio: 'Correios',
      },
      {
        id: 2,
        nomeTipoEnvio: 'ClickEntregas',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Tipo_envio', null, {});
  },
};
