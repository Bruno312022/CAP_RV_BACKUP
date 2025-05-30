const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController");
const authMiddleware = require("../Middleware/authMiddleware");

// Rotas protegidas pelo middleware de autenticação
router.post('/', authMiddleware, eventController.createEvent);
router.get('/', authMiddleware, eventController.listEvent);
router.put('/:eventoId', authMiddleware, eventController.updateEvent);
router.delete('/:eventoId', authMiddleware, eventController.deleteEvent);

module.exports = router;
