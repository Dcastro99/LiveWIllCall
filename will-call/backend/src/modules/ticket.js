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
  console.log('createTicket', req.body.ticket);
  try {
    const newTicket = await TicketModel.create({
      customerName: req.body.ticket.customer_name,
      orderNumber: req.body.ticket.order_number,
      customerPO: req.body.ticket.customer_po,
      TimeStamp: req.body.ticket.ticket_time,
      TeamMember: req.body.ticket.teamMember
    });
    res.status(200).send(newTicket);
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

module.exports = { getAllTickets, createTicket, deleteTicket };