const Correios = require('node-correios');
const correios = new Correios();
const { calcularPesoTotal, calcularValorTotal } = require('../utils/carrinhoUtils');
require('dotenv').config();

module.exports = {
  consultarFreteCorreios: async (req, res) => {
    const { sCepDestino } = req.query;
    const { carrinho } = req.session;

    const pesoTotal = calcularPesoTotal(carrinho);

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
  consultarFreteClickEntregas: async (req, res) => {
    const { carrinho } = req.session;
    const URL = 'https://robotapitest-br.borzodelivery.com/api/business/1.1/calculate-order';
    const TOKEN = process.env.CLICKENTREGAS_TOKEN;

    const matter = 'teste';

    const body = {
      type: 'standard',
      matter,
      vehicle_type_id: 8, //Motorbike
      total_weight_kg: Math.round(calcularPesoTotal(carrinho)),
      insurance_amount: calcularValorTotal(carrinho),
      loaders_count: 1,
      payment_method: 'cash',
      points: [{ address: 'R. Guamiranga, 1140 - Vila Independencia, São Paulo - SP, 04220-020' }, { address: 'Av. Paulista, 1439 - 12 - Bela Vista, São Paulo - SP, 01310-100' }],
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        body,
        headers: new Headers({
          'Content-type': 'application/json',
          'X-DV-Auth-Token': TOKEN,
        }),
      });

      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
};
