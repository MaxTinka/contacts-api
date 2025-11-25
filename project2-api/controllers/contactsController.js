const Contact = require('../models/Contact');
const Joi = require('joi');

// Validation schema
const contactSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().optional(),
  birthday: Joi.date().required()
});

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
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const existing = await Contact.findOne({ email: req.body.email });
    if (existing) return res.status(409).json({ success: false, message: 'Email already exists' });

    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating contact', error: error.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ success: false, message: 'Contact not found' });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact', error: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Contact not found' });

    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contact', error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
