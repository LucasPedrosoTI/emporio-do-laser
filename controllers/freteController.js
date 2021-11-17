const Correios = require('node-correios');
const correios = new Correios();

module.exports = {
  consultarFreteCorreios: async (req, res) => {
    const { sCepDestino } = req.query;
    const { carrinho } = req.session;

    const pesoTotal = carrinho.reduce((prev, curr) => {
      const pesoAtual = curr.tamanhoProduto.peso * parseInt(curr.qtd);
      return prev + pesoAtual;
    }, 0);

    const maiorProduto = carrinho.map(produto => parseFloat(produto.tamanhoProduto.tamanho.split(' ')[0])).sort((a, b) => b - a)[0];
    const medida = maiorProduto * 1.5;

    const opcoes = {
      nCdServico: '04510',
      sCepOrigem: '08110320',
      sCepDestino: sCepDestino.replace('-', ''),
      nVlPeso: pesoTotal.toString(),
      nCdFormato: 1,
      nVlComprimento: medida,
      nVlLargura: medida,
      nVlAltura: medida,
      nVlDiametro: medida,
    };

    try {
      const resultado = await correios.calcPreco(opcoes);

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
