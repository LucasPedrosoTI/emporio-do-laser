'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Clientes', [
      {
        id: 1,
        usuarioId: 2,
        telefone: '(11) 91234-5678',
        ehPessoaFisica: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        usuarioId: 3,
        telefone: '(11) 91234-5679',
        ehPessoaFisica: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Enderecos', null, {});
    return await queryInterface.bulkDelete('Clientes', null, {});
  },
};
