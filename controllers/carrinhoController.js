const { Endereco, Produto, TamanhoProduto, ImagemProduto, TipoPagamento, TipoEnvio } = require('../database/models');

module.exports = {
    listar: (req, res) => {
        if (!req.session.carrinho)
            req.session.carrinho = [/*{
                    produto: {
                        id: 2,
                        nomeProduto: 'Cakeboard Quadrado',
                        descricao: 'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
                        personalizavel: true,
                        categoriaId: 1,
                        deletedAt: null,
                        createdAt: '2021-11-11T01:06:31.000Z',
                        updatedAt: '2021-11-11T01:06:31.000Z',
                        ImagemProdutos: [
                            { id: 2, nomeImagem: '/img/produtos/cake2.jpg', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
                            { id: 3, nomeImagem: '/img/produtos/cake2.png', produtoId: 2, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
                        ],
                    },
                    tamanhoProduto: { id: 5, produtoId: 2, tamanho: '25 cm', quantidade: 20, peso: 0.75, preco: '4.99', createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 2 },
                    qtd: '4',
                    comLogomarca: true,
                },
                {
                    produto: {
                        id: 1,
                        nomeProduto: 'Cakeboard Redondo',
                        descricao: 'Base para Bolo ou Tabuleiro, Ideal principalmente para expor os bolos, tortas entre outros, pois se incorporam nas decorações, trazendo sofisticação para as festas. Podem ser usados tambem como apoio ou para transporte.',
                        personalizavel: true,
                        categoriaId: 1,
                        deletedAt: null,
                        createdAt: '2021-11-11T01:06:31.000Z',
                        updatedAt: '2021-11-11T01:06:31.000Z',
                        ImagemProdutos: [{ id: 1, nomeImagem: '/img/produtos/cake1.jpg', produtoId: 1, createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 1 }],
                    },
                    tamanhoProduto: { id: 1, produtoId: 1, tamanho: '20 cm', quantidade: 50, peso: 0.5, preco: '4.37', createdAt: '2021-11-11T01:06:31.000Z', updatedAt: '2021-11-11T01:06:31.000Z', ProdutoId: 1 },
                    qtd: '2',
                    comLogomarca: true,
                },
                {
                    produto: {
                        id: 4,
                        nomeProduto: 'Topo de Bolo Parabéns',
                        descricao: 'Topo de Bolo em MDF Revestido Branco 3mm e 15cm de Altura.',
                        personalizavel: false,
                        categoriaId: 2,
                        deletedAt: null,
                        createdAt: '2021-11-11T01:48:00.000Z',
                        updatedAt: '2021-11-11T01:48:00.000Z',
                        ImagemProdutos: [{ id: 5, nomeImagem: '/img/produtos/topo-parabens.png', produtoId: 4, createdAt: '2021-11-11T01:48:00.000Z', updatedAt: '2021-11-11T01:48:00.000Z', ProdutoId: 4 }],
                    },
                    tamanhoProduto: { id: 8, produtoId: 4, tamanho: '15 cm', quantidade: 15, peso: 0.4, preco: '15.88', createdAt: '2021-11-11T01:48:00.000Z', updatedAt: '2021-11-11T01:48:00.000Z', ProdutoId: 4 },
                    qtd: '1',
                    comLogomarca: false,
                },*/
            ];

        return res.json(req.session.carrinho);
    },

    excluir: (req, res) => {
        const { carrinho } = req.session;

        carrinho.forEach((item, index) => {
            if (item.tamanhoProduto.id === parseInt(req.body.id)) {
                carrinho.splice(index, 1);
            }
        });

        return res.json(carrinho);
    },

    alterarQtd: (req, res) => {
        if (req.session.carrinho) {
            if (req.body.id && !isNaN(req.body.id) && req.body.qtd && !isNaN(req.body.qtd) && req.body.qtd > 0) {
                const { id, qtd } = req.body;
                const { carrinho } = req.session;

                carrinho.forEach(item => {
                    if (item.tamanhoProduto.id === parseInt(id)) {
                        item.qtd = parseInt(qtd);
                    }
                });

                return res.json(req.session.carrinho);
            }
        } else {
            return res.json();
        }
    },

    pagamento: async(req, res) => {
        try {
            if (req.session.usuario.admin) {
                throw new Error('Não é possível fechar pedido como administrador');
            }

            const { id: clienteId } = req.session.usuario.Cliente;
            const enderecos = await Endereco.findAll({ where: { clienteId } });
            const tiposPagamento = await TipoPagamento.findAll();
            const tiposEnvio = await TipoEnvio.findAll();

            res.render('pagamento', { enderecos, tiposPagamento, tiposEnvio });
        } catch (error) {
            res.redirect('/minha-conta');
        }
    },

    addAoCarrinho: async(req, res) => {
        const { produtoId, quantidade, tamanhoProduto: tamanhoProdutoId, comLogomarca } = req.body;
        let productOnCart = false;

        if (!req.session.carrinho) {
            req.session.carrinho = [];
        }

        const produto = await Produto.findByPk(produtoId, {
            include: [ImagemProduto],
        });

        const tamanhoProduto = await TamanhoProduto.findByPk(tamanhoProdutoId);

        req.session.carrinho.forEach(item => {
            if (item.tamanhoProduto.id === tamanhoProduto.id) {
                item.qtd = parseInt(item.qtd) + parseInt(quantidade);
                productOnCart = true;
            }
        });

        if (!productOnCart) {
            req.session.carrinho.push({ produto, tamanhoProduto, qtd: quantidade, comLogomarca: !!comLogomarca });
        }

        return res.redirect('/carrinho');
    },
};