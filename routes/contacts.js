const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../controllers/contactsController');

// GET /contacts - Get all contacts
router.get('/', getAllContacts);

// GET /contacts/:id - Get single contact by ID
router.get('/:id', getContactById);

module.exports = router;