'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Tipo_Pagamento', [{
       id: 1,
       nomeTipoPagamento: 'Cartão de Crédito'
     },
     {
       id: 2,
       nomeTipoPagamento: 'Boleto'
     }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tipo_Pagamento', null, {});
  }
};
