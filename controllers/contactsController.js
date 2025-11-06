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

module.exports = {
  getAllContacts,
  getContactById
};