/* eslint-disable no-console */
// ----------------DOTENV Config----------------//

import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import mysql from "mysql2";
import util from "util";
import { checkUser } from "./src/middleware/validate.js";
import cookieParser from "cookie-parser";
import pkg from "mongoose";


// ----------------CRUD----------------//
import {
    getAllTickets,
    createTicket,
    deleteTicket,
    handleUpdateTicket,
    handleDataStorage,
    handleGetDataStorage,
    handleGetHistoryData,
} from "./src/modules/MDBticket.js";

import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import ticketRouter from "./src/routes/ticketRoutes.js";

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
app.get("*", checkUser);

// ------------------- COOKIE PARSER --------------------//

app.use(cookieParser());
// ------------------- ROUTES --------------------//
app.use(authRouter);
app.use(userRouter);
app.use(ticketRouter);

// ------------- TICKET ROUTE -------------//
app.post("/ticket", createTicket);
app.get("/allTickets", getAllTickets);
app.delete("/ticket/:id", deleteTicket);
app.put("/ticket/:id", handleUpdateTicket);
app.put("/data/:id", handleDataStorage);
app.get("/storeData", handleGetDataStorage);
app.post("/history", handleGetHistoryData);

const establishConnection = () => {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 3;

        function tryConnect() {
            const mysqlconnection = mysql.createConnection({
                host: process.env.HOST,
                user: "root",
                password: process.env.PASSWORD,
                database: "TeamMembers",
            });

            mysqlconnection.connect((err) => {
                if (err) {
                    console.error("Error connecting to MySQL:", err);
                    attempts++;
                    if (attempts < maxAttempts) {
                        console.log(
                            `Retrying connection (attempt ${attempts})...`
                        );
                        setTimeout(tryConnect, 2000);
                    } else {
                        reject(
                            new Error(
                                `Unable to establish a connection after ${maxAttempts} attempts`
                            )
                        );
                    }
                } else {
                    console.log("Connected to MySQL");
                    resolve(mysqlconnection);
                }
            });
        }

        tryConnect();
    });
};

// ------------- MONGOOSE -------------//
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

    res.status(500).send("Internal Server Error");
});

app.get("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

export { establishConnection };
