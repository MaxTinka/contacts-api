require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (modern Mongoose 7+)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // no deprecated options
    console.log('✅ Connected to MongoDB successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB();

// Routes
app.use('/contacts', require('./routes/contacts'));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '📇 Contacts API is running successfully!',
    endpoints: {
      getAll: '/contacts',
      getById: '/contacts/:id',
      create: 'POST /contacts',
      update: 'PUT /contacts/:id',
      delete: 'DELETE /contacts/:id'
    },
    author: 'Max Tinka',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({ error: '❌ Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
