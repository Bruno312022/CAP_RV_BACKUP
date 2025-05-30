const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'personaldb',
    host: 'localhost',
    password: 'redacted',
    username: 'root',
    port: 3306,
    storage: false
});

module.exports = sequelize;