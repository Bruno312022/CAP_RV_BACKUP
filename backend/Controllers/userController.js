const User = require('../Models/User');
const bcrypt = require('bcrypt');


//listar usuários
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar usuários." });
    }
};

//criar usuarios
exports.createUser = async (req, res) => {
    try {
        const { fullName, useremail, usertelefone, userpassword, userendereco, role } = req.body;
        const hashedPassword = await bcrypt.hash(userpassword, 10); // Criptografa a senha
        const user = await User.create({ fullName, useremail, usertelefone, userpassword: hashedPassword, userendereco, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, useremail, usertelefone, userpassword, userendereco, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

        user.fullName = fullName;
        user.useremail = useremail;
        if (usertelefone) user.usertelefone = usertelefone;
        if (userpassword) user.userpassword = await bcrypt.hash(password, 10); // Atualiza senha se fornecida
        if (userendereco) user.userendereco = userendereco;
        user.role = role;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

        await user.destroy();
        res.json({ message: "Usuário aniquilado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao aniquilar usuário." });
    }
};