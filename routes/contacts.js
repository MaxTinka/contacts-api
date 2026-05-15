const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ============ GET all contacts ============
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ GET single contact by ID ============
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ POST create new contact ============
// All fields are required
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate all required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' 
      });
    }
    
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    
    const savedContact = await newContact.save();
    // Return the new contact id in the response body
    res.status(201).json({ 
      message: 'Contact created successfully',
      id: savedContact._id,
      contact: savedContact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ PUT update contact by ID ============
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Return HTTP status code 200 OK
    res.status(200).json({ 
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ DELETE contact by ID ============
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Return HTTP status code 200 OK
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
