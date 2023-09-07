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
  console.log('ticket created!:',req.body);
  try {
    const newTicket = await TicketModel.create({
      customerName: req.body.ticket.customerName,
      orderNumber: req.body.ticket.orderNumber,
      customerPO: req.body.ticket.customerPO,
      timeStamp: req.body.ticket.timeStamp,
      teamMember: req.body.ticket.teamMember,
      storeData: req.body.ticket.storeData,
    });
    res.status(200).send(newTicket);
  } catch (err) {
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  console.log('deleted ticket!');
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
  console.log('this is the PARAMS:',req.params.id)
  console.log('this is the BODY:',req.body);
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
  console.log('this is the BODY in DATA STORAGE:',req.body);
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


async function handleGetDataStorage(req, res, next) {
  try {
      const allTickets = await TicketModel.find({ storeData: true });

    res.status(200).send(allTickets);
  } catch (error) {
    next(error.message);
  }
}

async function handleGetHistoryData(req, res, next) {
  console.log('specified data::',req.body.teamMember)
  const foundTickets = [];
  try {
    const dataObj = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      customerName: req.body.customerName.toLowerCase(),
      teamMember: req.body.teamMember.name.toLowerCase(),
    };

    const allTickets = await TicketModel.find({ storeData: true });

allTickets.forEach((ticket) => {
  if (dataObj.customerName=== ticket.customerName) {
   foundTickets.push(ticket);
  }
}
)
console.log('all tickets::',foundTickets)

    res.status(200).send(foundTickets);
  } catch (error) {
    next(error.message);
  }
}

export {
  getAllTickets, 
  createTicket,
  deleteTicket,
  handleUpdateTicket,
  handleDataStorage,
  handleGetDataStorage,
  handleGetHistoryData
};
