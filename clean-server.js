require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Contacts API is running!' });
});

// Contacts route - will add later
app.get('/contacts', (req, res) => {
  res.json({ message: 'GET all contacts - coming soon' });
});

// MongoDB connection
console.log('Starting server...');
console.log('MONGO_URI exists?', process.env.MONGO_URI ? 'YES' : 'NO');

if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set!');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
