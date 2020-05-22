const express = require("express");
const { check } = require("express-validator");

const routes = express.Router();

const UserController = require("./controllers/UserController");
const ProjectController = require("./controllers/ProjectController");

routes
  // Users
  .get('/users', UserController.index)
  .post('/users', [
    check('email').isEmail().withMessage("Tipo de e-mail inválido! Tente novamente."),
    check('username').isLength({ max: 16}).withMessage('Nome de usuário deve ter no máximo 16 caracteres.')
  ], UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete)
  // Projects
  .get('/projects', ProjectController.index)
  .post('/projects', ProjectController.create)
  .put('/projects/:id', ProjectController.update)
  .delete('/projects/:id', ProjectController.delete)

module.exports = routes;