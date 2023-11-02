import { getConnection, executeQuery } from "../../server.js";
import util from "util";
import { ticketErrors } from "../errorHandlers/ticketErrors.js";
import { error } from "console";

//---------------------CREATE TICKET FUNCTION---------------------//

const createTicket = async (req, res) => {
    // console.log("user creating ticket", req.body);
    let connection;
    const {
        customerName,
        orderNumber,
        customerPO,
        ticketTimeStamp,
        teamMember_id,
        branch_id,
    } = req.body;

    const timeConvert = parseInt(ticketTimeStamp, 10);
    const time = new Date(timeConvert);

    // console.log("teamMember_id 1", teamMember_id);
    let tmId = teamMember_id;
    if (tmId === null) {
        console.log("teamMember_id is null");
        tmId = 0;
    }

    // console.log("teamMember_id 2", tmId);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const ticketData = {
            customerName,
            orderNumber,
            customerPO,
            ticketTimeStamp: time,
            teamMember_id: tmId,
            storeData: 0,
            branch_id,
        };

        const ticketResults = await executeQuery("INSERT INTO tickets SET ?", [
            ticketData,
        ]);

        // console.log("ticketData", ticketData);
        console.log("ticketResults ID:", ticketResults);
        const updateUserData = {
            branch_id,
        };
        if (teamMember_id === 0) {
            // console.log("teamMember_id is 0!!!!");
            user_id = "0";
            const updateUserResult = await executeQuery(connection)(
                "UPDATE users SET ? WHERE user_id = ?",
                [updateUserData, teamMember_id]
            );
            console.log("updateUserResult:", updateUserResult);
        }

        res.status(201).send(ticketResults[0]);
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------GET TICKET FUNCTION---------------------//

const getBranchTickets = async (req, res) => {
    // const myUser = res.locals.user;
    const id = req.params.id;
    // console.log("getting tickets", req.params);
    // console.log("req.body", req.body);
    let connection;
    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [tickets] = await executeQuery(
            "SELECT t.id,u.user_id,u.empNum,  u.image, u.name,t.pickTicket,t.branch_id,t.customerPO,t.ticketTimeStamp, t.addedTMTimeStamp, t.customerName, t.orderNumber FROM tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE t.branch_id = ? AND t.storeData = 0",
            [id]
        );

        res.status(200).send(tickets);
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------UPDATE TICKET FUNCTION---------------------//

const updateTickets = async (req, res) => {
    console.log("user updating ticket", req.body);
    const { ticketId, ticket, user_id } = req.body;
    console.log("ticket.ticketTimeStamp", ticket.ticketTimeStamp);
    // const timeConvert = parseInt(ticket.ticketTimeStamp, 10);
    const teamMemberTimeStamp = new Date();
    const time = new Date(ticket.ticketTimeStamp);
    // const time = new Date(timeConvert);
    let connection;

    const updatedTicket = {
        customerName: ticket.customerName,
        orderNumber: ticket.orderNumber,
        customerPO: ticket.customerPO,
        ticketTimeStamp: time,
        addedTMTimeStamp: teamMemberTimeStamp,
        storeData: 0,
    };

    console.log("updating ticket", updatedTicket);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        if (user_id !== null) {
            updatedTicket["teamMember_id"] = user_id;

            await executeQuery("UPDATE tickets SET ? WHERE id = ?", [
                updatedTicket,
                ticketId,
            ]);

            const [tickets] = await executeQuery(
                "SELECT u.user_id,u.empNum, u.branch_id, u.image, u.name, t.customerName, t.orderNumber, t.ticketTimeStamp From tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE u.user_id = ?",
                [user_id]
            );

            console.log("ticket updated here", tickets[0]);

            res.status(200).send(tickets[0]);
        } else {
            const [updatedTickets] = await executeQuery(
                "UPDATE tickets SET ? WHERE id = ?",
                [updatedTicket, ticketId]
            );

            console.log("updatedTickets", updatedTickets);
            res.status(200).send(updatedTickets);
        }
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------STORE DATA FUNCTION---------------------//

const handleDataStorage = async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        const ticketId = req.params.id;

        const [currticketDataStatus] = await executeQuery(
            "SELECT t.storeData FROM tickets t WHERE id = ?",
            [ticketId]
        );
        if (currticketDataStatus[0].storeData === 1) {
            throw new Error("ticket already completed");
        }
        const updateData = {
            storeData: 1,
            completedTimeStamp: new Date(),
        };
        console.log("updateData", updateData);
        const [result] = await executeQuery(
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
            // connection.end();
            connection.release();
        }
    }
};

//---------------------GET STORED DATA FUNCTION---------------------//

const handleGetStoredData = async (req, res) => {
    let connection;
    // console.log("handleGetDataStored req.body", req.body);
    // const myUser = res.locals.user;
    // console.log("myUser- getAOne", myUser);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const branchId = req.params.id;
        const [result] = await executeQuery(
            "SELECT t.id, u.user_id, u.image, u.name, t.branch_id, t.customerPO,t.completedTimeStamp ,t.ticketTimeStamp, t.customerName, t.orderNumber " +
                "FROM tickets t " +
                "JOIN users u ON t.teamMember_id = u.user_id " +
                "WHERE t.branch_id = ? AND t.storeData = 1",
            [branchId]
        );

        res.status(200).send(result);
    } catch (e) {
        // console.log("Error getting ticket:", e);

        res.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------TIME CONVERT HELPER FUNCTION---------------------//

const timeConvert = (ticketTimeStamp) => {
    const isoTime = ticketTimeStamp;
    const dateTime = new Date(isoTime);
    const formattedDate = dateTime.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
};

//---------------------GET HISTORY DATA FUNCTION---------------------//

const handleGetHistoryData = async (req, res) => {
    let connection;
    // console.log("handleGetHistory>>> req.body", req.body);
    const { branch_id, from, to, customerName, name } = req.body;

    // console.log("newFrom", convertedFrom);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        let sql =
            "SELECT t.id, u.user_id, u.image, u.name, t.branch_id, t.customerPO,t.completedTimeStamp, t.addedTMTimeStamp , t.customerName, t.orderNumber, t.ticketTimeStamp " +
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

        const [result] = await executeQuery(sql, params);

        console.log("result", result);
        res.status(200).send(result);
    } catch (e) {
        console.log("Error getting ticket:", e);

        res.status(500).send("Internal Server Error");
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------SCAN TICKET FUNCTION---------------------//

const scanTicket = async (req, res) => {
    console.log("user scanning ticket", req.body);

    let connection;
    const { pickTicket, branch_id } = req.body;

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [ticket] = await executeQuery(
            "SELECT * FROM pickTickets pt WHERE pt.pickTicket = ?",
            [pickTicket]
        );

        if (ticket[0].branch_id !== branch_id) {
            res.status(409).send("Pick ticket does not belong to this branch");
        } else {
            console.log("ticket", ticket);
            if (ticket.length === 0) {
                console.log("ticket not found");
                res.status(404).send("Ticket not found");
            } else {
                const newTicket = await CreateScanTicket(ticket[0]);
                console.log("newTicket", newTicket);
                if (newTicket === undefined) {
                    res.status(409).send("Ticket already scanned");
                } else {
                    res.status(200).json({
                        status: "ticket scanned successfully",
                        ticket: newTicket,
                    });
                }
            }
        }
    } catch (e) {
        const error = ticketErrors(e);
        res.status(500).send(error);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

const CreateScanTicket = async (ticketObj) => {
    console.log("user creating ticket", ticketObj);
    const ticketTimeStamp = new Date();
    let connection;
    const { pickTicket, customerName, orderNumber, customerPO, branch_id } =
        ticketObj;
    const teamMember_id = 0;

    try {
        connection = await getConnection();

        const ticketData = {
            pickTicket,
            customerName,
            orderNumber,
            customerPO,
            ticketTimeStamp,
            teamMember_id,
            storeData: 0,
            branch_id,
        };

        const [ticket] = await executeQuery(
            "SELECT t.pickTicket FROM tickets t WHERE t.pickTicket = ?",
            [pickTicket]
        );

        if (ticket.length > 0) {
            return undefined;
        } else {
            const ticketResults = await executeQuery(
                "INSERT INTO tickets SET ?",
                [ticketData]
            );
            console.log("ticketResults ID:", ticketResults);

            const updateUserData = {
                branch_id,
            };
            if (teamMember_id === 0) {
                // console.log("teamMember_id is 0!!!!");

                const updateUserResult = await executeQuery(
                    "UPDATE users SET ? WHERE user_id = ?",
                    [updateUserData, teamMember_id]
                );
                console.log("updateUserResult:", updateUserResult);
            }

            const [newTicket] = await executeQuery(
                "SELECT t.id,u.user_id, u.empNum, u.image, u.name,t.pickTicket,t.branch_id,t.customerPO,t.ticketTimeStamp, t.customerName, t.orderNumber FROM tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE t.pickTicket = ? AND t.storeData = 0",
                [pickTicket]
            );

            return newTicket[0];
        }
        // res.status(201).send(ticketResults[0]);
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//---------------------SCAN EMPLOYEE---------------------//

const scanEmployeeBadge = async (req, res) => {
    console.log("user updating ticket", req.body);
    const { ticketId, ticket, empNum } = req.body;
    console.log("ticket.ticketTimeStamp", ticket.ticketTimeStamp);
    // const timeConvert = parseInt(ticket.ticketTimeStamp, 10);
    const teamMemberTimeStamp = new Date();
    const time = new Date(ticket.ticketTimeStamp);
    // const time = new Date(timeConvert);
    let connection;

    const updatedTicket = {
        customerName: ticket.customerName,
        orderNumber: ticket.orderNumber,
        customerPO: ticket.customerPO,
        ticketTimeStamp: time,
        addedTMTimeStamp: teamMemberTimeStamp,
        storeData: 0,
    };

    console.log("scan emp ticket", updatedTicket);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        if (empNum !== null || "null") {
            const [tickets] = await executeQuery(
                "SELECT u.user_id,u.empNum, u.branch_id, u.image, u.name, t.customerName, t.orderNumber, t.ticketTimeStamp FROM tickets t JOIN users u ON t.teamMember_id = u.user_id WHERE u.empNum = ?",
                [empNum]
            );
            console.log("tickets***************", tickets[0]);
            if (tickets[0]==undefined) {
                console.log("Employee Id not found");
                res.status(404).send({message:"Employee Id not found"});
            } else {
                updatedTicket["teamMember_id"] = tickets[0].user_id;

                await executeQuery("UPDATE tickets SET ? WHERE id = ?", [
                    updatedTicket,
                    ticketId,
                ]);

                console.log("ticket updated w/scanEmp", tickets[0].user_id);

                res.status(200).send({
                    message: "Ticket updated successfully.",
                });
            }
        } else {
            updatedTicket["teamMember_id"] = 0;
            const [updatedTickets] = await executeQuery(
                "UPDATE tickets SET ? WHERE id = ?",
                [updatedTicket, ticketId]
            );

            console.log("updatedTickets in scanEmp", updatedTickets);
            res.status(200).send(updatedTickets);
        }
    } catch (e) {
        console.log("err>>>", e);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
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
    scanTicket,
    scanEmployeeBadge,
};
