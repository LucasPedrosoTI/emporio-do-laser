'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pessoas_Fisicas', [
      {
        id: 1,
        nome: 'Cliente Pessoa Fisica',
        cpf: '361.627.420-67',
        clienteId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoas_Fisicas', null, {});
  },
};
