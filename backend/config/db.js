const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  module.exports = sequelize