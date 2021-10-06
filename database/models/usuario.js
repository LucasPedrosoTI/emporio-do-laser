'use strict';

const { hashSync } = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      senha: {
        type: DataTypes.STRING,
        set(value) {
          if (!value) return;
          this.setDataValue('senha', hashSync(value, 10));
        },
      },
      admin: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
    },
    {
      modelName: 'Usuario',
      paranoid: true,
    }
  );
  Usuario.associate = models => {
    Usuario.hasOne(models.Cliente);

    Usuario.createPF = async (email, senha, telefone, nome, cpf) => {
      return await sequelize.transaction(async transaction => {
        return await Usuario.create(
          {
            email,
            senha,
            admin: false,
            Cliente: {
              telefone,
              PessoaFisica: {
                nome,
                cpf,
              },
            },
          },
          {
            include: [{ model: models.Cliente, include: [models.PessoaFisica] }],
            transaction,
          }
        );
      });
    };
  };

  return Usuario;
};
