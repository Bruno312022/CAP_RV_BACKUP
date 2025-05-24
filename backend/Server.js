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

// Função movida para o escopo global
const createAdminUser = async () => {
  const adminExists = await User.findOne({ where: { username: "admin" } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("1234", 10);
    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });
    console.log("Usuário admin criado com sucesso!");
  }
};

//rota usuarios cruds
app.use("/usuarios", authMiddleware, userRoutes);

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    accessSecret,
    { expiresIn: "30m" }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    refreshSecret,
    { expiresIn: "360d" }
  );

  res.json({ accessToken, refreshToken, role: user.role });
});

//inicia o servidor e cria o banco de dados
sequelize.sync()
  .then(() => {
    createAdminUser().then(() => {
      app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
      });
    });
  })
  .catch(err => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });

