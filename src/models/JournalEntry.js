import { ObjectID } from 'mongodb';
import dbClient from '../utils/db';

/**
 * Class representing a journal entry.
 */
class JournalEntry {
  /**
   * Create a journal entry.
   * @param {string} title - The title of the journal entry.
   * @param {string} content - The content of the journal entry.
   * @param {ObjectID} authorId - The ID of the author.
   * @param {Date} [createdAt=new Date()] - The creation date of the journal entry.
   */
  constructor(title, content, authorId, createdAt = new Date()) {
    this.title = title;
    this.content = content;
    this.authorId = new ObjectID(authorId);
    this.createdAt = createdAt;
  }

  /**
   * Create a new journal entry and save it to the database.
   * @param {string} title - The title of the journal entry.
   * @param {string} content - The content of the journal entry.
   * @param {ObjectID} authorId - The ID of the author.
   * @returns {Object} The created journal entry.
   */
  static async createJournalEntry(title, content, authorId) {
    const newEntry = new JournalEntry(title, content, authorId);
    const result = await dbClient.db.collection('journalEntries').insertOne(newEntry);
    return result.ops[0];
  }

  /**
   * Retrieve all journal entries associated with a specific user.
   * @param {ObjectID} userId - The ID of the user.
   * @returns {Array} The list of journal entries.
   */
  static async getJournalEntriesByUser(userId) {
    const entries = await dbClient.db.collection('journalEntries').find({ authorId: new ObjectID(userId) }).toArray();
    return entries;
  }

  /**
   * Retrieve a journal entry by its ID.
   * @param {ObjectID} id - The ID of the journal entry.
   * @returns {Object} The journal entry.
   * @throws Will throw an error if the ID is invalid.
   */
  static async getJournalEntryById(id) {
    if (!ObjectID.isValid(id)) {
      throw new Error('Invalid ID');
    }
    const entry = await dbClient.db.collection('journalEntries').findOne({ _id: new ObjectID(id) });
    return entry;
  }

  /**
   * Update an existing journal entry with new title and content.
   * @param {ObjectID} entryId - The ID of the journal entry.
   * @param {string} title - The new title of the journal entry.
   * @param {string} content - The new content of the journal entry.
   * @returns {Object} The updated journal entry.
   * @throws Will throw an error if the ID is invalid.
   */
  static async updateJournalEntry(entryId, title, content) {
    if (!ObjectID.isValid(entryId)) {
      throw new Error('Invalid ID');
    }
    const updatedEntry = await dbClient.db.collection('journalEntries').findOneAndUpdate(
      { _id: new ObjectID(entryId) },
      { $set: { title, content } },
      { returnDocument: 'after' }
    );
    return updatedEntry.value;
  }

  /**
   * Delete a journal entry from the database.
   * @param {ObjectID} entryId - The ID of the journal entry.
   * @returns {boolean} True if the journal entry was deleted, false otherwise.
   * @throws Will throw an error if the ID is invalid.
   */
  static async deleteJournalEntry(entryId) {
    if (!ObjectID.isValid(entryId)) {
      throw new Error('Invalid ID');
    }
    const result = await dbClient.db.collection('journalEntries').deleteOne({ _id: new ObjectID(entryId) });
    return result.deletedCount > 0;
  }
}

export default JournalEntry;
