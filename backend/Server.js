const express = require('express');
const cors = require('cors')
const bcrypt = require("bcrypt");
const sequelize = require("./Database/db");
const User = require("./Models/User");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.post("/login", async (req, res) => {
    const { useremail, userpassword } = req.body;
    const user = await User.findOne({ where: { useremail } });

    if (!user || !(await bcrypt.compare(userpassword, user.userpassword))) {
        return res.json({ success: false });
    }

    res.json({ success: true, role: user.role });
});


const createAdminUser = async () => {
    const adminExists = await User.findOne({ where: { useremail: "admin@teste.com" } });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash("1234", 10); // Criptografa a senha
        await User.create({
            fullName: "Administrador",
            useremail: "admin@teste.com",
            userpassword: hashedPassword,
            usertelefone: '',
            userendereco: '',
            role: "admin",
        });
        console.log("Usuário admin criado com sucesso!");
        
    }
};

sequelize.sync()
    .then(() => {
        // Cria o usuário admin ao iniciar o servidor
        createAdminUser().then(() => {
            app.listen(port, () => {
                console.log(`Servidor rodando em http://localhost:${port}`);
            });
        });
    })
    .catch(err => {
        console.error("Erro ao sincronizar o banco de dados:", err);
    }); 