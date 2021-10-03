module.exports = {
  development: {
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    database: 'emporio-do-laser',
    host: '127.0.0.1',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
