const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');

const AuthController = require('../controllers/AuthController');
const { authenticate } = require('../middleware/auth');


const UserController = require('../controllers/userController');
const JournalEntryController = require('../controllers/journalEntryController');



// Endpoint: GET /status
router.get('/status', AppController.getStatus);


// Auth endpoints
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);


// Journal Entry Routes
router.post('/JournalEntries', JournalEntryController.createJournalEntry);
router.get('/JournalEntries/user/:userId', JournalEntryController.getJournalEntriesByUser);
router.get('/journalEntries/:id', JournalEntryController.getJournalEntryById);
router.put('/JournalEntries/:id', JournalEntryController.updateJournalEntry);
router.delete('/JournalEntries/:id', JournalEntryController.deleteJournalEntry);

// User management routes
router.post('/register', UserController.register); // Route for user registration
router.post('/login', UserController.login); // Route for user login
router.get('/profile', UserController.getProfile); // Route for getting user profile
router.put('/profile', UserController.updateProfile); // Route for updating user profile
router.delete('/profile', UserController.deleteAccount); // Route for deleting user account

module.exports = router;
