'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pessoas_Juridicas', [
      {
        id: 1,
        cnpj: '36.269.190/0001-94',
        razao_social: 'Cliente Pessoa Juridica',
        clienteId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoas_Juridicas', null, {});
  },
};
