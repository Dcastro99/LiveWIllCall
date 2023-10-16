import { establishConnection } from "../../server.js";
import util from "util";
import { ticketErrors } from "../errorHandlers/ticketErrors.js";
import { error } from "console";

const createTicket = async (req, res) => {
    // console.log("user creating ticket", req.body);
    let connection;
    const {
        customerName,
        orderNumber,
        customerPO,
        timeStamp,
        teamMember_id,
        // storeData,
        branch_id,
    } = req.body;

    const timeConvert = parseInt(timeStamp, 10);
    const time = new Date(timeConvert);

    // console.log("teamMember_id 1", teamMember_id);
    let tmId = teamMember_id;
    if (tmId === null) {
        console.log("teamMember_id is null");
        tmId = 0;
    }

    // console.log("teamMember_id 2", tmId);

    try {
        connection = await establishConnection();

        const ticketData = {
            customerName,
            orderNumber,
            customerPO,
            timeStamp: time,
            teamMember_id: tmId,
            storeData: 0,
            branch_id,
        };

        const ticketResults = await util
            .promisify(connection.query)
            .bind(connection)("INSERT INTO tickets SET ?", ticketData);
        // console.log("ticketData", ticketData);
        // console.log("ticketResults ID:", ticketResults);
        const updateUserData = {
            branch_id,
        };
        if (teamMember_id === 0) {
            // console.log("teamMember_id is 0!!!!");
            user_id = "0";
            const updateUserResult = await util
                .promisify(connection.query)
                .bind(connection)("UPDATE users SET ? WHERE user_id = ?", [
                updateUserData,
                teamMember_id,
            ]);
            console.log("updateUserResult:", updateUserResult);
        }

        res.status(201).send(ticketResults);
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const getBranchTickets = async (req, res) => {
    // const myUser = res.locals.user;
    const id = req.body.branch_id;
    // console.log("getting tickets");
    // console.log("req.body", req.body);
    let connection;
    try {
        connection = await establishConnection();

        const [tickets] = await connection
            .promise()
            .query(
                "SELECT t.id,u.user_id,  u.image, u.name,t.branch_id,t.customerPO,t.timeStamp, t.customerName, t.orderNumber, t.timeStamp FROM tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE t.branch_id = ? AND t.storeData = 0",
                [id]
            );

        // console.log("tickets", tickets);
        res.status(200).send(tickets);
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const updateTickets = async (req, res) => {
    const { ticketId, ticket, user_id } = req.body;
    const timeConvert = parseInt(ticket.timeStamp, 10);
    const time = new Date(timeConvert);
    let connection;

    const updatedTicket = {
        customerName: ticket.customerName,
        orderNumber: ticket.orderNumber,
        customerPO: ticket.customerPO,
        timeStamp: time,
        storeData: 0,
    };

    try {
        connection = await establishConnection();

        if (user_id !== null) {
            await util.promisify(connection.query).bind(connection)(
                "UPDATE tickets SET teamMember_id = ? WHERE id = ?",
                [user_id, ticketId]
            );

            const [tickets] = await connection
                .promise()
                .query(
                    "SELECT u.user_id, u.branch_id, u.image, u.name, t.customerName, t.orderNumber, t.timeStamp From tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE u.user_id = ?",
                    [user_id]
                );

            // console.log("tickets", tickets[0]);

            res.status(200).send(tickets[0]);
        } else {
            const [updatedTickets] = await connection
                .promise()
                .query("UPDATE tickets SET ? WHERE id = ?", [
                    updatedTicket,
                    ticketId,
                ]);
            res.status(200).send(updatedTickets);
        }
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const handleDataStorage = async (req, res) => {
    let connection;
    // console.log("handleDataStorage req.body", req.body);
    // console.log("handleDataStorage req.body.id", req.params.id);
    try {
        connection = await establishConnection();

        const ticketId = req.params.id;

        const [currticketDataStatus] = await connection
            .promise()
            .query("SELECT t.storeData FROM tickets t WHERE id = ?", [
                ticketId,
            ]);
        // console.log("currticket", currticketDataStatus[0].storeData);
        if (currticketDataStatus[0].storeData === 1) {
            throw new Error("ticket already completed");
        }
        const updateData = {
            storeData: 1,
            completedTimeStamp: new Date(),
        };
        console.log("updateData", updateData);
        const [result] = await connection
            .promise()
            .query(
                "UPDATE tickets SET storeData = ?, completedTimeStamp = FROM_UNIXTIME(?) WHERE id = ?",
                [
                    updateData.storeData,
                    Math.floor(updateData.completedTimeStamp.getTime() / 1000),
                    ticketId,
                ]
            );

        console.log("Updated ticket:", result.affectedRows);
        if (result.affectedRows === 0) {
            throw new Error("ticket not found");
        }

        res.status(200).send("Ticket completed successfully.");
    } catch (e) {
        // console.log("Error updating ticket:", ticketErrors(e));
        const error = ticketErrors(e);
        res.status(500).send(error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const handleGetStoredData = async (req, res) => {
    let connection;
    // console.log("handleGetDataStored req.body", req.body);
    // const myUser = res.locals.user;
    // console.log("myUser- getAOne", myUser);

    try {
        connection = await establishConnection();

        const branchId = req.body.branch_id;
        const [result] = await connection
            .promise()
            .query(
                "SELECT t.id, u.user_id, u.image, u.name, t.branch_id, t.customerPO,t.completedTimeStamp ,t.timeStamp, t.customerName, t.orderNumber, t.timeStamp " +
                    "FROM tickets t " +
                    "JOIN users u ON t.teamMember_id = u.user_id " +
                    "WHERE t.branch_id = ? AND t.storeData = 1",
                [branchId]
            );

        // const [result] = await mysqlconnection
        //     .promise()
        //     .query(
        //         "SELECT *  FROM tickets WHERE branch_id = ? AND storeData = 1",
        //         [branchId]
        //     );
        // console.log("result", result);
        res.status(200).send(result);
    } catch (e) {
        // console.log("Error getting ticket:", e);

        res.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const timeConvert = (timeStamp) => {
    const isoTime = timeStamp;
    const dateTime = new Date(isoTime);
    const formattedDate = dateTime.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};

const handleGetHistoryData = async (req, res) => {
    let connection;
    // console.log("handleGetHistory>>> req.body", req.body);
    const { branch_id, from, to, customerName, name } = req.body;

    // console.log("newFrom", convertedFrom);

    try {
        connection = await establishConnection();

        let sql =
            "SELECT t.id, u.user_id, u.image, u.name, t.branch_id, t.customerPO,t.completedTimeStamp , t.customerName, t.orderNumber, t.timeStamp " +
            "FROM tickets t " +
            "JOIN users u ON t.teamMember_id = u.user_id " +
            "WHERE t.branch_id = ? AND t.storeData = 1";

        const params = [branch_id];

        if (from && to) {
            const convertedFrom = timeConvert(from);
            const convertedTo = timeConvert(to);
            sql += " AND t.completedTimeStamp BETWEEN ? AND ?";
            params.push(convertedFrom, convertedTo);
        }

        if (customerName) {
            sql += " AND t.customerName = ?";
            params.push(customerName);
        }

        if (name) {
            sql += " AND (u.name = ? OR t.customerName = ?)";
            params.push(name, name);
        }
        console.log("sql", sql);

        const [result] = await connection.promise().query(sql, params);

        console.log("result", result);
        res.status(200).send(result);
    } catch (e) {
        console.log("Error getting ticket:", e);

        res.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

export {
    createTicket,
    updateTickets,
    getBranchTickets,
    handleDataStorage,
    handleGetStoredData,
    handleGetHistoryData,
};
