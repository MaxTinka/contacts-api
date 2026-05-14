require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const contactsData = [
  { firstName: "John", lastName: "Doe", email: "john@example.com", favoriteColor: "blue", birthday: "1990-05-15" },
  { firstName: "Jane", lastName: "Smith", email: "jane@example.com", favoriteColor: "green", birthday: "1988-12-22" },
  { firstName: "Mike", lastName: "Johnson", email: "mike@example.com", favoriteColor: "red", birthday: "1995-07-30" },
  { firstName: "Sarah", lastName: "Williams", email: "sarah@example.com", favoriteColor: "purple", birthday: "1992-03-18" },
  { firstName: "David", lastName: "Brown", email: "david@example.com", favoriteColor: "orange", birthday: "1985-11-09" }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Contact.deleteMany();
    await Contact.insertMany(contactsData);
    console.log(`✅ Imported ${contactsData.length} contacts`);
    process.exit();
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedData();
