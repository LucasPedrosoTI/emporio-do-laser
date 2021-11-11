'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Status_pedido', [
      {
        id: 1,
        descricao: 'Aguardando Aprovação do Pagamento',
      },
      {
        id: 2,
        descricao: 'Pagamento Aprovado',
      },
      {
        id: 3,
        descricao: 'Em Produção',
      },
      {
        id: 4,
        descricao: 'Pedido Enviado',
      },
      {
        id: 5,
        descricao: 'Pedido Concluido',
      },
      {
        id: 6,
        descricao: 'Pedido Cancelado',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Status_pedido', null, {});
  }
};
