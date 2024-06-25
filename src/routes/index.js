const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const JournalEntryController = require('../controllers/journalEntryController');
// Endpoint: GET /status
router.get('/status', AppController.getStatus);

// Journal Entry Routes
router.post('/JournalEntries', JournalEntryController.createJournalEntry);
router.get('/JournalEntries/user/:userId', JournalEntryController.getJournalEntriesByUser);
router.get('/journalEntries/:id', JournalEntryController.getJournalEntryById);
router.put('/JournalEntries/:id', JournalEntryController.updateJournalEntry);
router.delete('/JournalEntries/:id', JournalEntryController.deleteJournalEntry);

module.exports = router;
