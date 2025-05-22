//importação dos itens necessários
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
app.use("/usuarios", userRoutes);

//login
app.post("/login", async (req, res) => {
  const{ username, password } = req.body;
  const user = await User.findOne({ where : {username} });

  if ( !user || !( await bcrypt.compare(password, user.password))) {
    return res.json({ success : false });
  }

    return res.json({ success : true, role: user.role });
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
