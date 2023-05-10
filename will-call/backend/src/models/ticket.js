const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
  customerName: String,
  orderNumber: String,
  customerPO: String,
  TimeStamp: Number,
  TeamMember: Object,
  storeData: Boolean,
  completedTimeStamp: Number,
  addedTMTimeStamp: Number

});

const TICKET = mongoose.model('ticket', ticketSchema);

module.exports = TICKET;
