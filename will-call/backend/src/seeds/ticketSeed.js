require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const ticket = require('../models/ticket');



const seed = async () => {
  await ticket.create({
    customerName: 'Apex',
    customerPO: 'Stock Truck',
    TimeStamp: '00:00:45',
    TeamMember: { name: 'John', image: 'https://i.imgur.com/BjdTeN2.jpg' }
  });
  console.log('Ticket seeded in database!');

  mongoose.disconnect();
};
seed();
