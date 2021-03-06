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
              ehPessoaFisica: true,
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

    Usuario.createPJ = async (email, senha, telefone, razao_social, cnpj) => {
      return await sequelize.transaction(async transaction => {
        return await Usuario.create(
          {
            email,
            senha,
            admin: false,
            Cliente: {
              telefone,
              ehPessoaFisica: false,
              PessoaJuridica: {
                razao_social,
                cnpj,
              },
            },
          },
          {
            include: [{ model: models.Cliente, include: [models.PessoaJuridica] }],
            transaction,
          }
        );
      });
    };
  };

  return Usuario;
};
