require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts');  // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/contacts', contactRoutes);  // Add this line - this enables /contacts routes

app.get('/', (req, res) => {
  res.json({ message: 'Contacts API is running!' });
});

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
