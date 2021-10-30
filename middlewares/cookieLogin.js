const { Usuario, Cliente, PessoaFisica, PessoaJuridica } = require('../database/models');

const cookieLogin = async (req, res, next) => {
  if (req.cookies?.manterLogado && !req.session.usuario) {
    const email = req.cookies.manterLogado;

    const usuario = await Usuario.findOne({ where: { email }, include: [{ model: Cliente, include: [PessoaFisica, PessoaJuridica] }] });

    if (usuario.email == email) {
      req.session.usuario = usuario;
    }
  }

  next();
};

module.exports = cookieLogin;
