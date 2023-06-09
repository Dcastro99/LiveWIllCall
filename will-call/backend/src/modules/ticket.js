import TicketModel from "../models/ticket.js";

async function getAllTickets(req, res, next) {
  try {
    const allTickets = await TicketModel.find({ storeData: false });

    res.status(200).send(allTickets);
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  try {
    const newTicket = await TicketModel.create({
      customerName: req.body.ticket.customerName,
      orderNumber: req.body.ticket.orderNumber,
      customerPO: req.body.ticket.customerPO,
      TimeStamp: req.body.ticket.TimeStamp,
      TeamMember: req.body.ticket.TeamMember,
      storeData: req.body.ticket.storeData,
    });
    res.status(200).send(newTicket);
  } catch (err) {
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  try {
    await TicketModel.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send("deleted ticket!");
  } catch (err) {
    next(err);
  }
}

async function handleUpdateTicket(req, res, next) {
  try {
    const result = await TicketModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body.ticket,

    );
    res.status(200).send(result);
  } catch (error) {
    next(error.message);
  }
}

async function handleDataStorage(req, res, next) {
  try {
    const result = await TicketModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body.ticket = {
        storeData: true,
        completedTimeStamp: new Date().getTime(),
      },

    );
    res.status(200).send(result);
  } catch (error) {
    next(error.message);
  }
}

export {
  getAllTickets, createTicket, deleteTicket, handleUpdateTicket, handleDataStorage,
};
