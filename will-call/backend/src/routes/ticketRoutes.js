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
ticketRouter.get("/getBranchTickets/:id", getBranchTickets);
ticketRouter.get("/storeData/:id", handleDataStorage);
ticketRouter.get("/getStoredData/:id", handleGetStoredData);
ticketRouter.post("/history", handleGetHistoryData);
ticketRouter.post("/scanTicket", scanTicket);
ticketRouter.post("/scanEmpBadge", scanEmployeeBadge);

export default ticketRouter;
