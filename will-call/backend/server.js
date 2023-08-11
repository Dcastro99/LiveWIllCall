/* eslint-disable no-console */
// ----------------DOTENV Config----------------//

import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";

// ----------------CRUD----------------//
import pkg from "mongoose";
import {
  getAllTickets, createTicket, deleteTicket, handleUpdateTicket, handleDataStorage,handleGetDataStorage
} from "./src/modules/ticket.js";

// ------------- ERROR HANDLING -------------//

import notFoundHandler from "./src/handlers/error404.js";
import errorHandler from "./src/handlers/error500.js";

// ------------ MONG-DB -------------//

dotenv.config();

// -----------APP USING EXPRESS & JSON -------------//
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(json());

// ------------- ROUTES -------------//

// ------------- PRODUCT CRUD -------------//

app.get("/allTickets", getAllTickets);
app.post("/ticket", createTicket);
app.delete("/ticket/:id", deleteTicket);
app.put("/ticket/:id", handleUpdateTicket);
app.put("/data/:id", handleDataStorage);
app.get('/storeData',handleGetDataStorage);

const { set, connect, connection } = pkg;
set("strictQuery", true);
connect(process.env.DATABASE_URL);
const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Mongoose is connected");
});

app.get("/", (request, response) => {
  response.send("TESTING Will Call APP!");
});

app.use((err, req, res, next) => {
  console.error(err);
  
  // Set the response status code for the error
  res.status(500).send('Internal Server Error');
});


app.get("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
