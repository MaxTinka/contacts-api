const Contact = require('../models/Contact');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error retrieving contacts',
      error: error.message 
    });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found' 
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Error retrieving contact',
      error: error.message 
    });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required.' 
      });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ 
      success: true,
      id: newContact._id 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error creating contact',
      error: error.message 
    });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found.' 
      });
    }

    res.sendStatus(204); // No Content
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error updating contact',
      error: error.message 
    });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found.' 
      });
    }

    res.sendStatus(204); // No Content
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error deleting contact',
      error: error.message 
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
