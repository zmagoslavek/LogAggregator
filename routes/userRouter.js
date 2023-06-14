// userRouter.js
const express = require('express');
const passport = require('passport');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const LogController = require('../controllers/LogController');
const validateToken = require('../middleware/validateToken');
// Define user routes
userRouter.post('/add-project',validateToken,userController.addProject);

userRouter.get('/projects/',validateToken,userController.getAllUserProjects);

userRouter.get('/projects/:projectId',validateToken,userController.getProjectById);

userRouter.post('/projects/:projectId/logs',validateToken, LogController.addLog);


module.exports = userRouter;
