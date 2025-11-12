const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

// GET /contacts - Get all contacts
router.get('/', getAllContacts);

// GET /contacts/:id - Get single contact by ID
router.get('/:id', getContactById);

// POST /contacts - Create new contact
router.post('/', createContact);

// PUT /contacts/:id - Update contact by ID
router.put('/:id', updateContact);

// DELETE /contacts/:id - Delete contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
