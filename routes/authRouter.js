const express = require('express');
const AuthController = require('../controllers/AuthController');
const passport = require('passport')
const authRouter = express.Router();

authRouter.post('/login', AuthController.login);

module.exports = authRouter;
