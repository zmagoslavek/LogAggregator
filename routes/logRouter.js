const express = require('express');
const router = express.Router();
const LogController = require('../controllers/LogController');

// Add a log
router.post('/logs', LogController.addLog);

module.exports = router;