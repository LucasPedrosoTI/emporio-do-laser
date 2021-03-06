'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Usuarios', [
      {
        id: 1,
        email: 'admin@mail.com',
        senha: bcrypt.hashSync('123456', 10),
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        email: 'user@mail.com',
        senha: bcrypt.hashSync('123456', 10),
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 3,
        email: 'pj@mail.com',
        senha: bcrypt.hashSync('123456', 10),
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Usuarios', null, {});
  },
};
