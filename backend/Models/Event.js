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
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Palestra'
    },

    imagem: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    link: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = Event;