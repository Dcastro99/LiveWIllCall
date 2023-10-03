import { Router } from "express";

import {
    createTicket,
    updateTickets,
    getBranchTickets,
    handleDataStorage,
    handleGetStoredData,
} from "../modules/tickets.js";

const ticketRouter = Router();

ticketRouter.post("/createTicket", createTicket);
ticketRouter.post("/updateTicket", updateTickets);
ticketRouter.get("/getBranchTickets", getBranchTickets);
ticketRouter.post("/storeData/:id", handleDataStorage);
ticketRouter.get("/getStoredData", handleGetStoredData);

export default ticketRouter;
