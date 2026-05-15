require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Contacts API is running!' });
});

// Basic route for contacts (temporary)
app.get('/contacts', (req, res) => {
  res.json({ message: 'GET all contacts - coming soon' });
});

console.log('=== STARTING SERVER ===');
console.log('1. Checking environment variables...');
const mongoURI = process.env.MONGO_URI;
console.log('   MONGO_URI exists?', mongoURI ? 'YES' : 'NO');
if (mongoURI) {
  console.log('   MONGO_URI length:', mongoURI.length);
  console.log('   First 30 chars:', mongoURI.substring(0, 30) + '...');
} else {
  console.error('   ERROR: MONGO_URI is not defined in environment!');
  process.exit(1);
}

console.log('2. Attempting to connect to MongoDB...');
mongoose.connect(mongoURI)
  .then(() => {
    console.log('   ✅ Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`   ✅ Server running on port ${PORT}`);
      console.log('=== SERVER IS LIVE ===');
    });
  })
  .catch(err => {
    console.error('   ❌ MongoDB connection FAILED:');
    console.error('   Error name:', err.name);
    console.error('   Error message:', err.message);
    if (err.reason) console.error('   Reason:', err.reason);
    process.exit(1);
  });
