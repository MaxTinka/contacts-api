require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const sampleContacts = [
  {
    firstName: 'Job',
    lastName: 'Talemwa',
    email: 'jobt@example.com',
    favoriteColor: 'Blue',
    birthday: new Date('1990-01-15')
  },
  {
    firstName: 'Mary',
    lastName: 'Atim',
    email: 'atim@example.com',
    favoriteColor: 'Green',
    birthday: new Date('2002-09-23')
  },
  {
    firstName: 'Mathias',
    lastName: 'Omoro',
    email: 'mitt.o@example.com',
    favoriteColor: 'Red',
    birthday: new Date('1988-11-30')
  },
  {
    firstName: 'Bella',
    lastName: 'Kaba',
    email: 'kaba@example.com',
    favoriteColor: 'Purple',
    birthday: new Date('2000-01-01')
  },
  {
    firstName: 'Jackson',
    lastName: 'Mokoto',
    email: 'mokoto@example.com',
    favoriteColor: 'Orange',
    birthday: new Date('1983-03-10')
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Contact.deleteMany({});
    console.log('Existing data cleared');

    // Import sample data
    await Contact.insertMany(sampleContacts);
    console.log('Sample data imported successfully');

    // Display the imported contacts
    const contacts = await Contact.find();
    console.log(`Imported ${contacts.length} contacts:`);
    contacts.forEach(contact => {
      console.log(`- ${contact.firstName} ${contact.lastName} (${contact.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();