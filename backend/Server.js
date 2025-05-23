//importação dos itens necessários
const jwt = require("jsonwebtoken");
const accessSecret = "chave_acesso_super_secreta";
const refreshSecret = "chave_refresh_token_super_secreta";
const authMiddleware = require("./Middleware/authMiddleware");
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const User = require("./Models/User")
const sequelize = require("./Database/db");
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = 3001;


app.use(express.json());
app.use(cors());

//rota usuarios cruds
app.use("/usuarios", authMiddleware, userRoutes);

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Busca usuário no banco
  const user = await User.findOne({ where: { username } });

  // Verifica se usuário existe e a senha está correta
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Gera access token (válido por 30 minutos)
  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    accessSecret,
    { expiresIn: "30m" }
  );

  // Gera refresh token (válido por 7 dias)
  const refreshToken = jwt.sign(
    { username: user.username },
    refreshSecret,
    { expiresIn: "360d" }
  );

  // Envia os tokens ao frontend
  res.json({ accessToken, refreshToken, role: user.role });
});

//inicia o servidor e cria o banco de dados
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
