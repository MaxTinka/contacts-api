const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id'
    }
  });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Local: http://localhost:${PORT}`);
});