const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/userController');

// Endpoint: GET /status
router.get('/status', AppController.getStatus);
router.post('/register', UserController.register); // Route for user registration
router.post('/login', UserController.login); // Route for user login
router.get('/profile', UserController.getProfile); // Route for getting user profile
router.put('/profile', UserController.updateProfile); // Route for updating user profile
router.delete('/profile', UserController.deleteAccount); // Route for deleting user account

module.exports = router;
