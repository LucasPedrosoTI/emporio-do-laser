module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'emporio_do_laser',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
