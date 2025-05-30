const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'nomedoDB',
    host: 'localhost',
    password: 'senha',
    username: 'root',
    port: 3306,
    storage: false
});

module.exports = sequelize;
