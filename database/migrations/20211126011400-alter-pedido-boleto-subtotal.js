'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Pedidos', 'subtotal', Sequelize.DECIMAL(10, 2));
        await queryInterface.changeColumn('Pedidos', 'boleto', Sequelize.TEXT);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Pedidos', 'subtotal', Sequelize.DECIMAL);
        await queryInterface.changeColumn('Pedidos', 'boleto', Sequelize.STRING);
    }
};