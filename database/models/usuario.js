'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
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
  };
  return Usuario;
};
