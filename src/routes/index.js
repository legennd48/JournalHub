const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const { authenticate } = require('../middleware/auth');



// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Auth endpoints
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);


module.exports = router;
