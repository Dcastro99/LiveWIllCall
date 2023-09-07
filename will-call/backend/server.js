/* eslint-disable no-console */
// ----------------DOTENV Config----------------//

import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import verifyJWT from "./src/middleware/verifyJWT.js";
import cookieParser from "cookie-parser";


// ----------------CRUD----------------//
import pkg from "mongoose";
import registerRoute from "./src/routes/register.js";
import ticketRoute from "./src/routes/ticket.js";
import loginRoute from "./src/routes/login.js";
import teamMemberRoute from "./src/routes/teamMembers.js";
import refreshRoute from "./src/routes/refresh.js";
import logoutRoute from "./src/routes/logout.js";


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

// ------------------- COOKIE PARSER --------------------//

app.use(cookieParser());

// ------------------- ROUTES --------------------//

// ------------- REGISTER ROUTE -------------//
app.use('/register',registerRoute);

//------------------ USER ROUTE ------------------//
app.use("/login", loginRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);


app.use("/allTickets", ticketRoute);

// app.use(verifyJWT);

// ------------- TICKET ROUTE -------------//
app.use("/ticket", ticketRoute);
app.use("/ticket/:id", ticketRoute);
app.use("/data/:id", ticketRoute);
app.use("/storeData", ticketRoute);
app.use("/history", ticketRoute);


// ------------- TEAM MEMBER ROUTE -------------//
app.use("/allTMs", teamMemberRoute);
app.use("/user", teamMemberRoute);



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
