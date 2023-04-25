const TicketModel = require('../models/ticket');

async function getAllTickets(req, res, next) {
  // console.log('getAllTickets', req);
  try {
    const allTickets = await TicketModel.find({});
    console.log('allTickets', allTickets);
    res.json(allTickets);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = getAllTickets;