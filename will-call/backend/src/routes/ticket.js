import express from 'express';
const ticketRoute = express.Router();

import {
    getAllTickets, 
    createTicket, 
    deleteTicket, 
    handleUpdateTicket, 
    handleDataStorage,
    handleGetDataStorage,
    handleGetHistoryData
  } from "../modules/ticket.js";

  ticketRoute.route('/')
  
  .get(getAllTickets)
  .post(createTicket)
  .delete(deleteTicket)
  .put(handleUpdateTicket)
  .put(handleDataStorage)
  .get(handleGetDataStorage)
  .post(handleGetHistoryData);


export default ticketRoute;
