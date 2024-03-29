import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  customerName: String,
  orderNumber: String,
  customerPO: String,
  timeStamp: Number,
  teamMember: Object,
  storeData: Boolean,
  completedTimeStamp: Number,
  addedTMTimeStamp: Number,

});

const TicketModel = mongoose.model("ticket", ticketSchema);

export default TicketModel;
