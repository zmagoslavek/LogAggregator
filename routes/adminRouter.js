// adminRouter.js
const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const checkRole = require('../middleware/checkRole');
const validateToken = require('../middleware/validateToken')

//admin routes
adminRouter.post('/register',validateToken,checkRole("ADMIN"),AdminController.registerUser);



module.exports = adminRouter;
