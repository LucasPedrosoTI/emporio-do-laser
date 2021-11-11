const { Cupom, CupomCategoria, Categoria } = require('../database/models');
const { currencyFormatter, percentFormatter, dateFormatter } = require('../utils/formatter');
module.exports = {
  cadastrarCupom: async (req, res) => {
    console.log(req.body);

    try {
      const { codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categorias } = req.body;

      if(!categorias) {
        throw new Error('Selecione pelo menos uma categoria.')
      }

      const cupom = await Cupom.create({
        codigo,
        descricao,
        taxaDeDesconto: ehPorcentagem == 1 ? taxaDeDesconto / 100 : taxaDeDesconto,
        dataExpiracao,
        habilitado,
        ehPorcentagem,
      });

      if(categorias.length > 1){
        await CupomCategoria.bulkCreate(
          categorias.map(categoriaId => ({
            cupomId: cupom.id,
            categoriaId,
          }))
        );
      } else {
        let categoriaId = categorias
        await CupomCategoria.create({
          cupomId: cupom.id,
          categoriaId,
        }); 
      }

    } catch (error) {
      const categorias = await Categoria.findAll();
      return res.render('minha-conta-admin/cadastrarcupons', { categorias, error: error.message, menu: 'cupons' });
    }

    return res.redirect('/minha-conta/cupons');
  },

  listarCupoms: async (req, res) => {
    const cupoms = await Cupom.findAll({
      include: [Categoria],
    });

    const cupomsFormatados = cupoms.map(cupom => ({
      ...cupom,
      id: cupom.id,
      descricao: cupom.descricao,
      ehPorcentagem: cupom.ehPorcentagem,
      codigo: cupom.codigo,
      habilitado: cupom.habilitado,
      dataExpiracao: dateFormatter.format(cupom.dataExpiracao),
      taxaDeDesconto: cupom.ehPorcentagem ? percentFormatter.format(cupom.taxaDeDesconto) : currencyFormatter.format(cupom.taxaDeDesconto),
    }));

    return res.render('minha-conta-admin/cupons', { cupoms: cupomsFormatados, menu: 'cupons' });
  },

  renderCadastrarCupom: async (req, res, next) => {
    const categorias = await Categoria.findAll();

    res.render('minha-conta-admin/cadastrarcupons', { categorias, menu: 'cupons' });
  },

  editarCupom: async (req, res) => {
    const { cupomId } = req.query;

    const categorias = await Categoria.findAll();
    let  cupom = await Cupom.findByPk(cupomId);

    res.render('minha-conta-admin/editarcupons', { cupom, categorias, menu: 'cupons' });
  },

  alterarCupom: async (req, res) => {
    console.log(req.body)
    try {
      const { id, codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categorias } = req.body;

      const cupom = await Cupom.update({
        codigo,
        descricao,
        taxaDeDesconto: ehPorcentagem == 1 ? taxaDeDesconto / 100 : taxaDeDesconto,
        dataExpiracao,
        habilitado,
        ehPorcentagem,
      },
      {
        where: { id }
      });

      // await CupomCategoria.bulkUpdate(
      //   categorias.map(categoriaId => ({
      //     cupomId: cupom.id,
      //     categoriaId,
      //   }))
      // );

    } catch (error) {
      return res.render('minha-conta-admin/editarcupons', { error: error.message, menu: 'cupons' });
    }

    return res.redirect('/minha-conta/cupons');
  },

  habilitarDesabilitarCupom: (req, res) => {},
};
