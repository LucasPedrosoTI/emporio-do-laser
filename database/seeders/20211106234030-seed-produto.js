'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Produtos', [
      {
        id: 1,
        nomeProduto: 'Cakeboard Redondo',
        descricao:
          'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
        personalizavel: true,
        categoriaId: 1,
      },
      {
        id: 2,
        nomeProduto: 'Cakeboard Quadrado',
        descricao:
          'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
        personalizavel: true,
        categoriaId: 1,
      },
      {
        id: 3,
        nomeProduto: 'Cakeboard Ondulado',
        descricao:
          'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
        personalizavel: true,
        categoriaId: 1,
      },
      {
        id: 4,
        nomeProduto: 'Topo de Bolo Parabéns',
        descricao: 'Topo de Bolo em MDF Revestido Branco 3mm e 15cm de Altura.',
        personalizavel: false,
        categoriaId: 2,
      },
      {
        id: 5,
        nomeProduto: 'Topo de Bolo Casamento',
        descricao: 'Topo de Bolo em MDF Revestido Branco 3mm e 15cm de Altura.',
        personalizavel: false,
        categoriaId: 2,
      },
      {
        id: 6,
        nomeProduto: 'Caixa Cenário com Gaveta',
        descricao: 'Caixa cenário para deixa seu presente com uma cara única.',
        personalizavel: true,
        categoriaId: 3,
      },
      {
        id: 7,
        nomeProduto: 'Caixa Cenário Pequena',
        descricao: 'Caixa cenário para deixa seu presente com uma cara única.',
        personalizavel: true,
        categoriaId: 3,
      },
    ]);

    return await queryInterface.bulkInsert('Imagens_produtos', [
      {
        id: 1,
        nomeImagem: '/img/produtos/cake1.jpg',
        produtoId: 1,
      },
      {
        id: 2,
        nomeImagem: '/img/produtos/cake2.jpg',
        produtoId: 2,
      },
      {
        id: 3,
        nomeImagem: '/img/produtos/cake2.png',
        produtoId: 2,
      },
      {
        id: 4,
        nomeImagem: '/img/produtos/cake-ond.png',
        produtoId: 3,
      },
      {
        id: 5,
        nomeImagem: '/img/produtos/topo-parabens.png',
        produtoId: 4,
      },
      {
        id: 6,
        nomeImagem: '/img/produtos/topo-casamento.png',
        produtoId: 5,
      },
      {
        id: 7,
        nomeImagem: '/img/produtos/caixa-gaveta.png',
        produtoId: 6,
      },
      {
        id: 8,
        nomeImagem: '/img/produtos/caixa-gaveta-2.png',
        produtoId: 6,
      },
      {
        id: 9,
        nomeImagem: '/img/produtos/caixa-pequena.jpg',
        produtoId: 7,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Imagens_produtos', null, {});

    return await queryInterface.bulkDelete('Produtos', null, {});
  },
};
