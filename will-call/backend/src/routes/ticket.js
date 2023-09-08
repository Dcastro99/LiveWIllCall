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

  ticketRoute.get('/', getAllTickets);
  ticketRoute.post('/', createTicket);
  ticketRoute.delete('/', deleteTicket);
  ticketRoute.put('/', handleUpdateTicket);
  ticketRoute.put('/', handleDataStorage);
  ticketRoute.get('/', handleGetDataStorage);
  ticketRoute.post('/', handleGetHistoryData);

  // ticketRoute.route('/')

  
  // .get(getAllTickets)
  // .post(createTicket)
  // .delete(deleteTicket)
  // .put(handleUpdateTicket)
  // .put(handleDataStorage)
  // .get(handleGetDataStorage)
  // .post(handleGetHistoryData);


export default ticketRoute;
