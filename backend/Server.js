const express = require('express');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("Servidor local alocado na porta 3001")
})