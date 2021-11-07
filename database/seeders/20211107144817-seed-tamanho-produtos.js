'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Tamanho_produtos', [
      {
        id: 1,
        produtoId: 1,
        tamanho: '20 cm',
        quantidade: 50,
        peso: 0.5,
        preco: 4.0,
      },
      {
        id: 2,
        produtoId: 1,
        tamanho: '22 cm',
        quantidade: 30,
        peso: 0.55,
        preco: 4.5,
      },
      {
        id: 3,
        produtoId: 1,
        tamanho: '30 cm',
        quantidade: 20,
        peso: 0.7,
        preco: 6.0,
      },
      {
        id: 4,
        produtoId: 2,
        tamanho: '20 cm',
        quantidade: 10,
        peso: 0.5,
        preco: 4.5,
      },
      {
        id: 5,
        produtoId: 2,
        tamanho: '25 cm',
        quantidade: 20,
        peso: 0.75,
        preco: 4.9,
      },
      {
        id: 6,
        produtoId: 3,
        tamanho: '20 cm',
        quantidade: 10,
        peso: 0.75,
        preco: 4.5,
      },
      {
        id: 7,
        produtoId: 3,
        tamanho: '30 cm',
        quantidade: 10,
        peso: 0.75,
        preco: 4.6,
      },
      {
        id: 8,
        produtoId: 4,
        tamanho: '15 cm',
        quantidade: 15,
        peso: 0.4,
        preco: 15.0,
      },
      {
        id: 9,
        produtoId: 5,
        tamanho: '15 cm',
        quantidade: 10,
        peso: 0.4,
        preco: 15.0,
      },
      {
        id: 10,
        produtoId: 6,
        tamanho: '25 cm',
        quantidade: 10,
        peso: 180,
        preco: 65.0,
      },
      {
        id: 11,
        produtoId: 7,
        tamanho: '10 cm',
        quantidade: 15,
        peso: 100,
        preco: 20.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Tamanho_produtos', null, {});
  },
};
