const { DataTypes } = require('sequelize');
const sequelize = require("../Database/db");


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    useremail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    usertelefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
     
    userpassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userendereco: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM("admin", "common"),
        allowNull: false,
        defaultValue: "common",
    },
});


module.exports = User;