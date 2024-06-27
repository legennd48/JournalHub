import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import { authenticate } from '../middleware/auth';
import UserController from '../controllers/userController';
import JournalEntryController from '../controllers/journalEntryController';

const router = express.Router();

/**
 * @module routes/index
 * @description Defines the API routes for the application.
 */

// Endpoint: GET /status
router.get('/status', AppController.getStatus); // Endpoint to check the status of the application

// Auth endpoints
router.post('/login', AuthController.login); // Endpoint to handle user login
router.post('/logout', authenticate, AuthController.logout); // Endpoint to handle user logout

// Journal Entry Routes
router.post('/JournalEntries', JournalEntryController.createJournalEntry); // Endpoint to create a new journal entry
router.get('/JournalEntries/user/:userId', JournalEntryController.getJournalEntriesByUser); // Endpoint to get all journal entries by user ID
router.get('/journalEntries/:id', JournalEntryController.getJournalEntryById); // Endpoint to get a journal entry by ID
router.put('/JournalEntries/:id', JournalEntryController.updateJournalEntry); // Endpoint to update a journal entry by ID
router.delete('/JournalEntries/:id', JournalEntryController.deleteJournalEntry); // Endpoint to delete a journal entry by ID

// User services Entry routes
router.post('/register', UserController.register); // Route for user registration
router.get('/profile', authenticate, UserController.getProfile); // Route for getting user profile (secured with authentication)
router.put('/profile', authenticate, UserController.updateProfile); // Route for updating user profile (secured with authentication)
router.delete('/profile', authenticate, UserController.deleteAccount); // Route for deleting user account

module.exports = router;
