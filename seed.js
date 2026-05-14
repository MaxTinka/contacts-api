require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const contactsData = [
  { firstName: "Max", lastName: "Tinka", email: "maxtinka7@gmail.com", favoriteColor: "blue", birthday: "1997-09-16" },
  { firstName: "Bella", lastName: "Kabahuma", email: "bella@example.com", favoriteColor: "green", birthday: "2000-01-01" },
  { firstName: "Matt", lastName: "Omoro", email: "matt@example.com", favoriteColor: "red", birthday: "1995-07-30" },
  { firstName: "Joy", lastName: "Blessed", email: "joy@example.com", favoriteColor: "purple", birthday: "1992-03-18" },
  { firstName: "Job", lastName: "Talemwa", email: "job@example.com", favoriteColor: "orange", birthday: "1985-11-09" }
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
