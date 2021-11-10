const { Cupom, CupomCategoria, Categoria } = require('../database/models');

module.exports = {
  cadastrarCupom: async (req, res) => {
    console.log(req.body);

    try {
      const { codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categoriaId } = req.body;

      const cupom = await Cupom.create({
        codigo,
        descricao,
        taxaDeDesconto,
        dataExpiracao,
        habilitado,
        ehPorcentagem,
      });

      const categoriaCupom = await CupomCategoria.create({
        cupomId: cupom.id,
        categoriaId,
      });
    } catch (error) {
      return res.render('minha-conta-admin/cadastrarcupons', { error: error.message, menu: 'cupons' });
    }

    return res.redirect('/minha-conta/cupons');
  },

  listarCupoms: async (req, res) => {
    const cupoms = await Cupom.findAll({
      include: [Categoria],
    });

    return res.render('minha-conta-admin/cupons', { cupoms, menu: 'cupons' });
  },

  editarCupom: (req, res) => {},

  alterarCupom: (req, res) => {},

  habilitarDesabilitarCupom: (req, res) => {},
};
