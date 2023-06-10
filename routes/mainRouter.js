const express = require('express');
const mainRouter = express.Router();

// Import other routers
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
// ...

// Add routes from other routers to the main router
mainRouter.use('/users', userRouter);
mainRouter.use('/admin', adminRouter);
// ...

module.exports = mainRouter;