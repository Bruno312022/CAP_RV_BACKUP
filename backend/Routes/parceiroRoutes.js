const express = require("express");
const router = express.Router();
const parceiroController = require("../Controllers/parceiroController");
const authMiddleware = require("../Middleware/authMiddleware");

// Rotas protegidas pelo middleware de autenticação
router.post("/", authMiddleware, parceiroController.createParceiro);
router.get("/", authMiddleware, parceiroController.listParceiros);
router.put("/:parcId", authMiddleware, parceiroController.updateParceiro);
router.delete("/:parcId", authMiddleware, parceiroController.deleteParceiro);

module.exports = router;
