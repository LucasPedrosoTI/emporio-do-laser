const { Endereco } = require('../database/models');

module.exports = {
  buscarEnderecoPorId: async (req, res) => {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(id);

    res.json({ endereco });
  },
};
