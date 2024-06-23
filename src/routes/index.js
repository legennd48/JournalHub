const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

// Endpoint: GET /status
router.get('/status', AppController.getStatus);


module.exports = router;
