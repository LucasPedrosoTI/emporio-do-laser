'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
        static associate(models) {
            Cliente.belongsTo(models.Usuario);
            Cliente.hasOne(models.PessoaFisica, { foreignKey: 'clienteId' });
            Cliente.hasOne(models.PessoaJuridica, { foreignKey: 'clienteId' });
            Cliente.hasMany(models.Endereco);
            Cliente.hasMany(models.Pedido, { foreignKey: 'clienteId' });

            Cliente.updateDados = async(id, telefone, cpfCnpj, nomeRazaoSocial) => {
                return await sequelize.transaction(async transaction => {
                    return await Cliente.findByPk(id, { include: [models.PessoaFisica, models.PessoaJuridica] }).then(async Cliente => {
                        Cliente.telefone = telefone;
                        await Cliente.save({ transaction });

                        if (Cliente.ehPessoaFisica) {
                            Cliente.PessoaFisica.cpf = cpfCnpj;
                            Cliente.PessoaFisica.nome = nomeRazaoSocial;
                            await Cliente.PessoaFisica.save({ transaction });
                        } else {
                            Cliente.PessoaJuridica.cnpj = cpfCnpj;
                            Cliente.PessoaJuridica.razao_social = nomeRazaoSocial;
                            await Cliente.PessoaJuridica.save({ transaction });
                        }
                        return Cliente;
                    });
                });
            };
        }
    }
    Cliente.init({
        usuarioId: DataTypes.BIGINT,
        telefone: DataTypes.STRING,
        logo: DataTypes.STRING,
        ehPessoaFisica: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Cliente',
    });
    return Cliente;
};