// userRouter.js
const express = require('express');
const passport = require('passport');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const LogController = require('../controllers/LogController');

// Define user routes
userRouter.post('/add-project', /*passport.authenticate('local'),*/userController.addProject);

userRouter.get('/projects/', /*passport.authenticate('local'),*/userController.getAllUserProjects);

userRouter.get('/projects/:projectId', /*passport.authenticate('local'),*/userController.getProjectById);

userRouter.post('/projects/:projectId/logs',LogController.addLog);
// ...

module.exports = userRouter;
