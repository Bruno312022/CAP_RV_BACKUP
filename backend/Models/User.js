const sequelize = require("../Database/db")
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
    
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
},
    
    username: { 
        type: DataTypes.TEXT, 
        allowNull: false
},
    
    password: { 
        type: DataTypes.TEXT, 
        allowNull: false 
},
    
    role: { 
        type: DataTypes.ENUM("admin", "common", "colaborador"),
         allowNull: false, 
         defaultValue: "common" 
}
});

module.exports = User;