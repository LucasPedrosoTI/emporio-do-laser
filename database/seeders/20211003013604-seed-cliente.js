'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Clientes', [
      {
        id: 1,
        usuarioId: 2,
        telefone: '(11) 91234-5678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        usuarioId: 3,
        telefone: '(11) 91234-5679',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Clientes', null, {});
  },
};
