const jwt = require("jsonwebtoken");
const accessSecret = "chave_acesso_super_secreta";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token ausente" });
    }

    try {
        const decoded = jwt.verify(token, accessSecret);


        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}

module.exports = authMiddleware;