const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'mydb',
    host: 'localhost',
    password: '123456',
    username: 'root',
    port: 3306,
    storage: false
});

module.exports = sequelize;
