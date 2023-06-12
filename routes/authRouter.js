const express = require('express');
const AuthController = require('../controllers/AuthController');
const bodyParser = require('body-parser');
const passport = require('passport')
const authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local'), AuthController.login);

module.exports = authRouter;
