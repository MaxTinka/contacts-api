const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Connect to MongoDB ---
connectDB()
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Stop the app if DB connection fails
  });

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/contacts', require('./routes/contacts'));

// --- Root route for testing ---
app.get('/', (req, res) => {
  res.json({
    message: '📇 Contacts API is running successfully!',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id'
    },
    author: 'Your Name',
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- 404 Error Handler ---
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Route not found. Check your endpoint URL.'
  });
});

// --- Global Error Handler (important for Render) ---
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// --- Start Server ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Access it at: http://localhost:${PORT}`);
});
