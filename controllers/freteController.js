const Correios = require('node-correios');
const correios = new Correios();
const { calcularPesoTotal, calcularValorTotal } = require('../utils/carrinhoUtils');
const { ClickEntregas } = require('../lib/axios');

module.exports = {
  consultarFreteCorreios: async (req, res) => {
    const { sCepDestino } = req.query;
    const { carrinho } = req.session;

    try {
      if (!carrinho) throw new Error('Não há itens no carrinho');

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
      const resultado = await correios.calcPreco(opcoes);

      return res.status(200).json({ valor: resultado[0].Valor.replace(',', '.') });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  },
  consultarFreteClickEntregas: async (req, res) => {
    const { carrinho, usuario } = req.session;
    const { cepDestino } = req.query;

    try {
      if (!carrinho) throw new Error('Não há itens no carrinho');

      const name = usuario.Cliente.ehPessoaFisica ? usuario.Cliente.PessoaFisica.nome : usuario.Cliente.PessoaJuridica.razao_social;
      const matter = carrinho.map(item => item.produto.nomeProduto).join(', ');
      const body = {
        type: 'standard',
        matter,
        vehicle_type_id: 8, //Motorbike
        total_weight_kg: Math.round(calcularPesoTotal(carrinho)),
        insurance_amount: calcularValorTotal(carrinho),
        loaders_count: 1,
        payment_method: 'non_cash',
        points: [
          { address: '08110-320', contact_person: { name: 'Camila Romão', phone: '5511986471542' } },
          { address: cepDestino, contact_person: { name, phone: usuario.Cliente.telefone } },
        ],
      };

      const { data } = await ClickEntregas.post('', body);

      res.json({ valor: data.order.delivery_fee_amount });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },
};
