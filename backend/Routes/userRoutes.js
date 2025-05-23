const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");
const jwt = require("jsonwebtoken");


router.post('/', authMiddleware, userController.createUser);
router.get('/', authMiddleware, userController.listUsers);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;