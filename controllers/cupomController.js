const { Cupom, CupomCategoria, Categoria } = require('../database/models');
const { Op } = require('sequelize');
const { currencyFormatter, percentFormatter, dateFormatter } = require('../utils/formatter');
module.exports = {
  cadastrarCupom: async (req, res) => {
    console.log(req.body);

    try {
      const { codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categorias } = req.body;

      if (!categorias) {
        throw new Error('Selecione pelo menos uma categoria.');
      }

      const cupom = await Cupom.create({
        codigo,
        descricao,
        taxaDeDesconto: ehPorcentagem == 1 ? taxaDeDesconto / 100 : taxaDeDesconto,
        dataExpiracao,
        habilitado,
        ehPorcentagem,
      });

      if (categorias.length > 1) {
        await CupomCategoria.bulkCreate(
          categorias.map(categoriaId => ({
            cupomId: cupom.id,
            categoriaId,
          }))
        );
      } else {
        let categoriaId = categorias;
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
    let cupom = await Cupom.findByPk(cupomId);

    res.render('minha-conta-admin/editarcupons', { cupom, categorias, menu: 'cupons' });
  },

  alterarCupom: async (req, res) => {
    try {
      const { id, codigo, descricao, taxaDeDesconto, dataExpiracao, habilitado, ehPorcentagem, categorias } = req.body;

      if (!categorias) {
        throw new Error('Selecione pelo menos uma categoria.');
      }

      const cupom = await Cupom.update(
        {
          codigo,
          descricao,
          taxaDeDesconto: ehPorcentagem == 1 ? parseFloat(taxaDeDesconto) / 100 : parseFloat(taxaDeDesconto),
          dataExpiracao,
          habilitado,
          ehPorcentagem: ehPorcentagem == 1,
        },
        {
          where: { id },
        }
      );

      await CupomCategoria.destroy({ where: { cupomId: id } });

      if (categorias.length > 1) {
        await CupomCategoria.bulkCreate(
          categorias.map(categoriaId => ({
            cupomId: id,
            categoriaId,
          }))
        );
      } else {
        let categoriaId = categorias;
        await CupomCategoria.create({
          cupomId: id,
          categoriaId,
        });
      }

    } catch (error) {
      return res.redirect('/minha-conta/cupons');
    }

    return res.redirect('/minha-conta/cupons');
  },

  habilitarDesabilitarCupom: async (req, res) => {
    const { id, habilitado } = req.body;

    await Cupom.update(
      {
        habilitado
      },
      {
        where: { id },
      }
    );

    res.redirect('/minha-conta/cupons');
  },

  validarCupom: async (req, res) => {
    try {
      const { codigoCupom, categorias } = req.query;
      const categoriasCarrinho = categorias.split(',').map(c => parseInt(c));

      const cupom = await Cupom.findOne({
        where: {
          codigo: codigoCupom,
          habilitado: { [Op.eq]: 1 },
          dataExpiracao: { [Op.gt]: new Date() },
        },
        include: [
          {
            model: Categoria,
            where: {
              id: categoriasCarrinho,
            },
          },
        ],
      });

      if(!cupom){
        throw new Error('Cupom inválido ou expirado')
      }

      const categoriasAceitas = cupom.Categoria.map(categoria => categoria.id);

      categoriasCarrinho.forEach(categoria => {
        if (!categoriasAceitas.includes(categoria)) {
          throw new Error('Há itens no carrinho que são inválidos para este cupom');
        }
      });

      res.status(200).json(cupom);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },
};
