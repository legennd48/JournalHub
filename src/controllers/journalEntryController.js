import JournalEntry from '../models/JournalEntry';

class JournalEntryController {
  /**
   * Create a new journal entry.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The created journal entry.
   */
  static async createJournalEntry(req, res) {
    try {
      const { title, content, authorId } = req.body;
      const newEntry = await JournalEntry.createJournalEntry(title, content, authorId);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieve all journal entries associated with a specific user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Array} The list of journal entries.
   */
  static async getJournalEntriesByUser(req, res) {
    try {
      const entries = await JournalEntry.getJournalEntriesByUser(req.params.userId);
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieve a journal entry by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The journal entry.
   */
  static async getJournalEntryById(req, res) {
    try {
      const entry = await JournalEntry.getJournalEntryById(req.params.id);
      if (!entry) {
        return res.status(404).json({ error: 'Journal Entry not found' });
      }
      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing journal entry with new title and content.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The updated journal entry.
   */
  static async updateJournalEntry(req, res) {
    try {
      const { title, content } = req.body;
      const updatedEntry = await JournalEntry.updateJournalEntry(req.params.id, title, content);
      if (!updatedEntry) {
        return res.status(404).json({ error: 'Journal Entry not found' });
      }
      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a journal entry.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {void}
   */
  static async deleteJournalEntry(req, res) {
    try {
      const success = await JournalEntry.deleteJournalEntry(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Journal Entry not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = JournalEntryController;
