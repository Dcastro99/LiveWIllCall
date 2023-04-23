require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const ticket = require('../models/ticket');



const seed = async () => {
  await ticket.create({
    customerNam: 'Apex',
    orderNumber: 1897546,
    customerPO: 'Stock Truck',
    TimeStamp: '00:00:45',
  });
  console.log('Ticket seeded in database!');

  mongoose.disconnect();
};
seed();
