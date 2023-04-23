const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
  customerName: String,
  orderNumber: Number,
  customerPO: String,
  TimeStamp: String,
});

const TICKET = mongoose.model('ticket', ticketSchema);

module.exports = TICKET;
