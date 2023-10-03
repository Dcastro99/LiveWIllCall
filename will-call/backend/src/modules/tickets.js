import { mysqlconnection } from "../../server.js";
import util from "util";
import { ticketErrors } from "../errorHandlers/ticketErrors.js";
import { error } from "console";

const createTicket = async (req, res) => {
    console.log("user creating ticket", req.body);

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

    console.log("teamMember_id 1", teamMember_id);
    let tmId = teamMember_id;
    if (tmId === null) {
        console.log("teamMember_id is null");
        tmId = 0;
    }

    console.log("teamMember_id 2", tmId);

    try {
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
            .promisify(mysqlconnection.query)
            .bind(mysqlconnection)("INSERT INTO tickets SET ?", ticketData);
        console.log("ticketData", ticketData);
        console.log("ticketResults ID:", ticketResults);
        const updateUserData = {
            branch_id,
        };
        if (teamMember_id === 0) {
            console.log("teamMember_id is 0!!!!");
            user_id = "0";
            const updateUserResult = await util
                .promisify(mysqlconnection.query)
                .bind(mysqlconnection)("UPDATE users SET ? WHERE user_id = ?", [
                updateUserData,
                teamMember_id,
            ]);
            console.log("updateUserResult:", updateUserResult);
        }

        res.status(201).send(ticketResults);
    } catch (e) {
        console.log("err>>>", e);
    }
};

const getBranchTickets = async (req, res) => {
    const myUser = res.locals.user;

    // console.log("getting tickets");
    try {
        const [tickets] = await mysqlconnection
            .promise()
            .query(
                "SELECT t.id,u.user_id,  u.image, u.name,t.branch_id,t.customerPO,t.timeStamp, t.customerName, t.orderNumber, t.timeStamp FROM tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE t.branch_id = ? AND t.storeData = 0",
                [myUser.branch_id]
            );

        // console.log("tickets", tickets);
        res.status(200).send(tickets);
    } catch (e) {
        console.log("err>>>", e);
    }
};

const updateTickets = async (req, res) => {
    const { ticketId, ticket, user_id } = req.body;
    console.log("getting user_id in upDate", user_id);
    console.log("getting ticketId in upDate", ticketId);
    console.log("getting tickets in upDate", ticket);
    try {
        console.log("if user_id1", user_id);

        if (user_id !== null) {
            console.log("if user_id2", user_id);

            await util.promisify(mysqlconnection.query).bind(mysqlconnection)(
                "UPDATE tickets SET teamMember_id = ? WHERE id = ?",
                [user_id, ticketId]
            );

            const [tickets] = await mysqlconnection
                .promise()
                .query(
                    "SELECT u.user_id, u.branch_id, u.image, u.name, t.customerName, t.orderNumber, t.timeStamp From tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE u.user_id = ?",
                    [user_id]
                );

            console.log("tickets", tickets[0]);

            res.status(200).send(tickets[0]);
        } else {
            const [updatedTickets] = await mysqlconnection
                .promise()
                .query("UPDATE tickets SET ? WHERE id = ?", [ticket, ticketId]);
            console.log("updatedTickets", updatedTickets);
            res.status(200).send(updatedTickets);
        }
    } catch (e) {
        console.log("err>>>", e);
    }
};

const handleDataStorage = async (req, res) => {
    console.log("handleDataStorage req.body", req.body);
    console.log("handleDataStorage req.body.id", req.params.id);
    try {
        const ticketId = req.params.id;

        const [currticketDataStatus] = await mysqlconnection
            .promise()
            .query("SELECT t.storeData FROM tickets t WHERE id = ?", [
                ticketId,
            ]);
        console.log("currticket", currticketDataStatus[0].storeData);
        if (currticketDataStatus[0].storeData === 1) {
            throw new Error("ticket already completed");
        }
        const updateData = {
            storeData: 1,
            completedTimeStamp: new Date(),
        };
        console.log("updateData", updateData);
        const [result] = await mysqlconnection
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
    }
};

const handleGetStoredData = async (req, res) => {
    console.log("handleGetDataStored req.body", req.body);
    const myUser = res.locals.user;
    console.log("myUser- getAOne", myUser);

    try {
        const branchId = myUser.branch_id;
        const [result] = await mysqlconnection
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
        console.log("result", result);
        res.status(200).send(result);
    } catch (e) {
        console.log("Error getting ticket:", e);

        res.status(500).send("Internal Server Error");
    }
};

export {
    createTicket,
    updateTickets,
    getBranchTickets,
    handleDataStorage,
    handleGetStoredData,
};
