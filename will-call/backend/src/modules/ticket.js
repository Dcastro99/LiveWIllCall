const TicketModel = require('../models/ticket');

async function getAllTickets(req, res, next) {
  try {
    const allTickets = await TicketModel.find({});
    res.json(allTickets);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = getAllTickets;