const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
  customerName: String,
  orderNumber: String,
  customerPO: String,
  TimeStamp: String,
  TeamMember: Object
});

const TICKET = mongoose.model('ticket', ticketSchema);

module.exports = TICKET;
