const User = require("../Models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha
        const user = await User.create({ username, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar usuários." });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

        user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10); // Atualiza senha se fornecida
        user.role = role;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

        await user.destroy();
        res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
};