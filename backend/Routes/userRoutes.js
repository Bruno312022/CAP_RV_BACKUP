/**
 * Rotas de Usuário
 * Define todas as rotas relacionadas ao CRUD de usuários
 * Todas as rotas aqui já são protegidas pelo authMiddleware no Server.js
 */

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

/**
 * Rotas disponíveis:
 * POST /   - Cria um novo usuário
 * GET /    - Lista todos os usuários
 * GET /:id - Busca um usuário específico
 * PUT /:id - Atualiza um usuário
 * DELETE /:id - Remove um usuário
 */

// Criar novo usuário
router.post('/', userController.createUser);

// Listar todos os usuários
router.get('/', userController.listUsers);

// Buscar usuário por ID
router.get('/:id', userController.getUser);

// Atualizar usuário
router.put('/:id', userController.updateUser);

// Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;