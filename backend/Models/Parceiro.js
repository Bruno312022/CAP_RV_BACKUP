const sequelize = require("../Database/db")
const { DataTypes } = require("sequelize");

const Parceiro = sequelize.define("Parceiro", {
    
    parcId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
},
    
    parcName: { 
        type: DataTypes.TEXT, 
        allowNull: false
},
    
    parcEndereco: { 
        type: DataTypes.TEXT, 
        allowNull: false 
},
});

module.exports = Parceiro;