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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

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

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
