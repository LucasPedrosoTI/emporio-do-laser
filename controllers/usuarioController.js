const { Usuario } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = {
  logar: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      // let user = users.find(user => user.email == email && bcrypt.compareSync(senha, user.senha));

      if (!bcrypt.compareSync(senha, usuario.senha)) {
        return res.render('login-cadastro', { error: 'Usuário/Senha inválido' });
      }

      usuario.senha = undefined;

      req.session.usuario = usuario;

      res.redirect('minha-conta');
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
};
