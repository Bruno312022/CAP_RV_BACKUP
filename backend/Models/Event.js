const sequelize = require("../Database/db")
const { DataTypes } = require("sequelize");

const Event = sequelize.define("Event", {
    
    eventoId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
},
    
    eventoName: { 
        type: DataTypes.TEXT, 
        allowNull: false
},
    
    eventoEndereco: { 
        type: DataTypes.TEXT, 
        allowNull: false 
},

    eventoData: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventoHora: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

module.exports = Event;