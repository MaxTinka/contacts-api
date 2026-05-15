require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Contact routes
app.use('/contacts', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    documentation: 'https://contacts-api-111111.onrender.com/api-docs'
  });
});

// MongoDB connection
console.log('Starting server...');
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('ERROR: MONGO_URI environment variable is not set!');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
