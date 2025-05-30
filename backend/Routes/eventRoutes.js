const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController")
const authMiddleware = require("../Middleware/authMiddleware");
const jwt = require("jsonwebtoken");


router.post('/', authMiddleware, eventController.createEvent);
router.get('/', authMiddleware, eventController.listEvent);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;