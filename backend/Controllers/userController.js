/**
 * Controller de Usuários
 * Responsável por toda a lógica de negócio relacionada aos usuários
 */

const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

/**
 * Função auxiliar para tratar erros do Sequelize
 * Converte erros do banco de dados em mensagens amigáveis
 */
const handleSequelizeError = (error) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0].path;
        return `${field === 'username' ? 'Nome de usuário' : 'Email'} já está em uso.`;
    }
    if (error.name === 'SequelizeValidationError') {
        return error.errors[0].message;
    }
    return 'Erro interno do servidor.';
};

/**
 * Criar Usuário
 * POST /usuarios
 * Cria um novo usuário no sistema
 */
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        console.log('Dados recebidos:', { 
            username, 
            email, 
            role,
            hasPassword: !!password 
        });

        // Validação básica dos campos obrigatórios
        if (!username || !password) {
            return res.status(400).json({
                error: "Nome de usuário e senha são obrigatórios."
            });
        }

        // Verifica se já existe usuário com mesmo username ou email
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [
                    { username: username.trim() },
                    { email: email?.trim() }
                ]
            } 
        });

        if (existingUser) {
            return res.status(400).json({
                error: existingUser.username === username.trim() 
                    ? "Este nome de usuário já está em uso."
                    : "Este email já está em uso."
            });
        }

        // Prepara os dados do usuário para criação
        const userData = {
            username: username.trim(),
            email: email?.trim() || `${username.trim()}@recompensaverde.com`,
            password: await bcrypt.hash(password, 10), // Criptografa a senha
            role: role || 'user' // Se não especificado, usa 'user'
        };

        console.log('Criando usuário:', {
            username: userData.username,
            email: userData.email,
            role: userData.role
        });

        // Cria o usuário no banco
        const user = await User.create(userData);

        // Retorna o usuário criado (sem a senha)
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error('Erro detalhado ao criar usuário:', error);
        
        // Tratamento específico de erros
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: "Este nome de usuário ou email já está em uso."
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: "Dados inválidos. Verifique os campos e tente novamente."
            });
        }

        res.status(500).json({ 
            error: "Erro interno ao criar usuário. Tente novamente." 
        });
    }
};

/**
 * Buscar Usuário
 * GET /usuarios/:id
 * Retorna os dados de um usuário específico
 */
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // Não retorna a senha
        });

        if (!user) {
            return res.status(404).json({ 
                error: "Usuário não encontrado." 
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ 
            error: "Erro ao buscar usuário." 
        });
    }
};

/**
 * Listar Usuários
 * GET /usuarios
 * Retorna a lista de todos os usuários
 */
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }, // Não retorna as senhas
            order: [['createdAt', 'DESC']] // Ordena por data de criação
        });
        res.json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ 
            error: "Erro ao listar usuários." 
        });
    }
};

/**
 * Atualizar Usuário
 * PUT /usuarios/:id
 * Atualiza os dados de um usuário existente
 */
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

        // Busca o usuário
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ 
                error: "Usuário não encontrado." 
            });
        }

        // Verifica se o novo username/email já existe
        if (username || email) {
            const existingUser = await User.findOne({
                where: {
                    id: { [Op.ne]: id }, // Exclui o usuário atual da busca
                    [Op.or]: [
                        username ? { username: username.trim() } : null,
                        email ? { email: email.trim() } : null
                    ].filter(Boolean)
                }
            });

            if (existingUser) {
                return res.status(400).json({
                    error: existingUser.username === username?.trim()
                        ? "Este nome de usuário já está em uso."
                        : "Este email já está em uso."
                });
            }
        }

        // Atualiza os campos
        if (username) user.username = username.trim();
        if (email) user.email = email.trim().toLowerCase();
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (role) user.role = role;

        await user.save();

        // Retorna o usuário atualizado (sem a senha)
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            updatedAt: user.updatedAt
        };

        res.json(userResponse);

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: "Dados inválidos. Verifique os campos e tente novamente."
            });
        }

        res.status(500).json({ 
            error: "Erro ao atualizar usuário." 
        });
    }
};

/**
 * Deletar Usuário
 * DELETE /usuarios/:id
 * Remove um usuário do sistema
 */
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ 
                error: "Usuário não encontrado." 
            });
        }

        await user.destroy();
        res.json({ 
            message: "Usuário deletado com sucesso." 
        });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ 
            error: "Erro ao deletar usuário." 
        });
    }
};