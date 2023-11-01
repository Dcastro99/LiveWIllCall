import { Router } from "express";


import {
    createTicket,
    updateTickets,
    getBranchTickets,
    handleDataStorage,
    handleGetStoredData,
    handleGetHistoryData,
    scanTicket,
    scanEmployeeBadge
} from "../modules/tickets.js";

const ticketRouter = Router();

ticketRouter.post("/createTicket", createTicket);
ticketRouter.post("/updateTicket", updateTickets);
ticketRouter.post("/getBranchTickets", getBranchTickets);
ticketRouter.post("/storeData/:id", handleDataStorage);
ticketRouter.post("/getStoredData", handleGetStoredData);
ticketRouter.post("/history", handleGetHistoryData);
ticketRouter.post("/scanTicket", scanTicket);
ticketRouter.post("/scanEmpBadge", scanEmployeeBadge);

export default ticketRouter;
