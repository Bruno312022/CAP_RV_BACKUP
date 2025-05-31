/**
 * Modelo de Usuário
 * Define a estrutura da tabela de usuários no banco de dados
 */

const sequelize = require("../Database/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
    // ID único do usuário
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    
    // Nome de usuário (login)
    username: { 
        type: DataTypes.STRING(255), 
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255] // Mínimo 3 caracteres, máximo 255
        }
    },
    
    // Email do usuário
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Valida formato de email
        }
    },
    
    // Senha do usuário (armazenada com hash)
    password: { 
        type: DataTypes.STRING(255), 
        allowNull: false,
        validate: {
            len: [6, 255] // Mínimo 6 caracteres, máximo 255
        }
    },
    
    // Tipo/Papel do usuário no sistema
    role: { 
        type: DataTypes.ENUM("admin", "user", "colaborador"),
        allowNull: false, 
        defaultValue: "user", // Valor padrão ao criar usuário
        validate: {
            isIn: [['admin', 'user', 'colaborador']] // Valores permitidos
        }
    },

    // Nome completo do usuário (opcional)
    nome: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    // Telefone do usuário (opcional)
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    // Configurações adicionais do modelo
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'Users', // Nome da tabela no banco
    
    // Hooks - Funções executadas antes/depois de operações
    hooks: {
        // Antes de validar, limpa espaços em branco dos campos
        beforeValidate: (user) => {
            if (user.username) user.username = user.username.trim();
            if (user.email) user.email = user.email.trim().toLowerCase();
            if (user.password) user.password = user.password.trim();
            if (user.nome) user.nome = user.nome.trim();
            if (user.telefone) user.telefone = user.telefone.trim();
        }
    }
});

module.exports = User;