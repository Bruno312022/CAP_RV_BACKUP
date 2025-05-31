const jwt = require("jsonwebtoken");
const accessSecret = "chave_acesso_super_secreta";

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
        const decoded = jwt.verify(token, accessSecret);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado" });
        }
        return res.status(401).json({ error: "Token inválido" });
    }
}

module.exports = authMiddleware;