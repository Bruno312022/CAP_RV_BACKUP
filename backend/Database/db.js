const { Sequelize } = require('sequelize');

const sequelize = new sequelize({
    database: 'database_name',
    username: 'username',
    password: 'senha',
    host: 'localhost',
    dialect: 'mysql',
    storage: './Database.mysql',
    logging: false
});

module.exports = User; 