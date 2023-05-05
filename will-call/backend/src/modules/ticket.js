const TicketModel = require('../models/ticket');

async function getAllTickets(req, res, next) {
  // console.log('getAllTickets', req);
  try {
    const allTickets = await TicketModel.find({});
    // console.log('allTickets', allTickets);
    // res.json(allTickets);
    res.status(200).send(allTickets);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function createTicket(req, res, next) {
  // console.log('createTicket', req.body.ticket);
  try {
    // const ticket = await TicketModel.findOne({ orderNumber: req.body.ticket.orderNumber });
    // console.log('ticketCreate', ticket);
    // if (ticket) res.status(400).send('ticket already exists');
    // else {

    const newTicket = await TicketModel.create({
      customerName: req.body.ticket.customerName,
      orderNumber: req.body.ticket.orderNumber,
      customerPO: req.body.ticket.customerPO,
      TimeStamp: req.body.ticket.TimeStamp,
      TeamMember: req.body.ticket.TeamMember
    });
    res.status(200).send(newTicket);
    // }
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  console.log('deleteTicket', req.params.id);
  try {
    const deleteTicket = await TicketModel.deleteOne({
      _id: req.params.id
    })
    console.log('deleted!!!!!', deleteTicket);
    res.status(200).send('deleted ticket!');
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function handleUpdateTicket(req, res) {
  console.log('ticket--Update HIt::', req.body.ticket)
  console.log('UPDATED!!::', req.params)
  try {
    const result = await TicketModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body.ticket
    );
    res.status(200).send(result);
  } catch (error) {
    next(error.message);
  }
}


module.exports = { getAllTickets, createTicket, deleteTicket, handleUpdateTicket };