// adminRouter.js
const bodyParser = require('body-parser')
const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const passport = require('passport');
const { checkRole } = require('../middleware/roleMiddleware');


// Define admin routes
adminRouter.post('/register', /*checkRole("ADMIN"),*/AdminController.registerUser);

// ...

module.exports = adminRouter;
