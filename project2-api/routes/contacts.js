const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

// Optional: validation middleware can be added here in the future
// const validateContact = require('../middleware/validateContact');

// GET /contacts - Get all contacts
router.get('/', asyncHandler(getAllContacts));

// GET /contacts/:id - Get single contact by ID
router.get('/:id', asyncHandler(getContactById));

// POST /contacts - Create new contact
router.post('/', asyncHandler(createContact));

// PUT /contacts/:id - Update contact by ID
router.put('/:id', asyncHandler(updateContact));

// DELETE /contacts/:id - Delete contact by ID
router.delete('/:id', asyncHandler(deleteContact));

module.exports = router;
