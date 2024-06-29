import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import { authenticate } from '../middleware/auth';
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from '../controllers/userController';
import JournalEntryController from '../controllers/journalEntryController';

const router = express.Router();

/**
 * @module routes/index
 * @description Defines the API routes for the application.
 */

// Endpoint: GET /status
router.get('/status', (req, res) => AppController.getStatus(req, res)); // Endpoint to check the status of the application
router.get('/stats', (req, res) => AppController.getStats(req, res));
router.get('/user/entries/:id', (req, res) => AppController.getUserEntries(req, res));

// Auth endpoints
router.post('/login', (req, res) => AuthController.login(req, res)); // Endpoint to handle user login
router.post('/logout', authenticate, (req, res) => AuthController.logout(req, res)); // Endpoint to handle user logout

// Journal Entry Routes
router.post('/JournalEntries', (req, res) => JournalEntryController.createJournalEntry(req, res)); // Endpoint to create a new journal entry
router.get('/JournalEntries/user/:userId', (req, res) => JournalEntryController.getJournalEntriesByUser(req, res)); // Endpoint to get all journal entries by user ID
router.get('/journalEntries/:id', (req, res) => JournalEntryController.getJournalEntryById(req, res)); // Endpoint to get a journal entry by ID
router.put('/JournalEntries/:id', (req, res) => JournalEntryController.updateJournalEntry(req, res)); // Endpoint to update a journal entry by ID
router.delete('/JournalEntries/:id', (req, res) => JournalEntryController.deleteJournalEntry(req, res)); // Endpoint to delete a journal entry by ID

// User services Entry routes
router.post('/register', (req, res) => registerUser(req, res));
router.get('/profile/:userId', authenticate, (req, res) => getUserProfile(req, res)); // Add authenticate middleware
router.put('/profile/:userId', authenticate, (req, res) => updateUserProfile(req, res)); // Add authenticate middleware
router.delete('/profile/:userId', authenticate, (req, res) => deleteUserAccount(req, res)); // Add authenticate middleware

export default router;
