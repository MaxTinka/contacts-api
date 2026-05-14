require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Contacts API is running!' });
});

app.get('/contacts', (req, res) => {
  res.json({ message: 'GET all contacts - coming soon' });
});

console.log('Starting server...');
const mongoURI = process.env.MONGO_URI;
console.log('MONGO_URI exists?', mongoURI ? 'YES' : 'NO');
console.log('MONGO_URI length:', mongoURI ? mongoURI.length : 0);
console.log('First 20 chars:', mongoURI ? mongoURI.substring(0, 20) : 'N/A');

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
    console.error('❌ FULL MongoDB error:', err);
    console.error('❌ Error message:', err.message);
    console.error('❌ Error name:', err.name);
    process.exit(1);
  });
