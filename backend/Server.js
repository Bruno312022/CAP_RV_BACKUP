/**
 * Servidor principal da aplicação Recompensa Verde
 * Este arquivo configura e inicializa o servidor Express, define rotas e middlewares
 */

//=================== IMPORTAÇÕES ===================
// Bibliotecas de autenticação e segurança
const jwt = require("jsonwebtoken");
const accessSecret = "chave_acesso_super_secreta";
const refreshSecret = "chave_refresh_token_super_secreta";
const authMiddleware = require("./Middleware/authMiddleware");
const bcrypt = require("bcrypt");

// Framework e middlewares principais
const express = require('express');
const cors = require('cors');

// Banco de dados
const sequelize = require("./Database/db");

//=================== MODELS ===================
// Importação dos modelos do banco de dados
const User = require("./Models/User");         // Model de usuários
const Event = require("./Models/Event");       // Model de eventos
const Parceiro = require("./Models/Parceiro"); // Model de parceiros

//=================== ROTAS ===================
// Importação dos arquivos de rotas
const userRoutes = require('./Routes/userRoutes');       // Rotas de usuários
const eventRoutes = require('./Routes/eventRoutes');     // Rotas de eventos
const parceiroRoutes = require('./Routes/parceiroRoutes'); // Rotas de parceiros

//=================== CONFIGURAÇÃO DO SERVIDOR ===================
const app = express();
const port = 3001;

// Middlewares globais
app.use(express.json()); // Para parsing de JSON
app.use(cors());         // Para permitir requisições cross-origin

//=================== FUNÇÕES AUXILIARES ===================
/**
 * Função para criar usuário administrador padrão
 * Executada quando o servidor inicia
 * Cria um usuário admin se não existir
 */
const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ where: { username: "admin" } });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("1234", 10);
            await User.create({
                username: "admin",
                email: "admin@recompensaverde.com",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Usuário admin criado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao criar usuário admin:", error);
    }
};

//=================== ROTAS PROTEGIDAS ===================
// Todas estas rotas requerem autenticação via token JWT
app.use("/usuarios", authMiddleware, userRoutes);    // Gerenciamento de usuários
app.use("/eventos", authMiddleware, eventRoutes);    // Gerenciamento de eventos
app.use("/parceiros", authMiddleware, parceiroRoutes); // Gerenciamento de parceiros

//=================== ROTA DE LOGIN ===================
/**
 * Rota de autenticação
 * Não requer token pois é usada para obter o token inicial
 */
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busca o usuário no banco
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado." });
        }

        // Verifica a senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            "chave_acesso_super_secreta",
            { expiresIn: "24h" }
        );

        // Retorna o token e dados do usuário
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
});

//=================== INICIALIZAÇÃO DO SERVIDOR ===================
/**
 * Sincroniza os modelos com o banco de dados
 * Cria o usuário admin se necessário
 * Inicia o servidor na porta especificada
 */
sequelize.sync()
    .then(async () => {
        await createAdminUser();
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("Erro ao sincronizar o banco de dados:", err);
    });

