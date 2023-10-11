import { loginErrors } from "../errorHandlers/loginErrors.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { establishConnection } from "../../server.js";
import util from "util";
import pkg from "validator";
import { v4 as uuidv4 } from "uuid";
import { cloudinary } from "../cloudinary.js";

const { isEmail } = pkg;

// const { v4: uuidv4 } = require('uuid');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

const Mysignup_post = async (req, res) => {
    // console.log("user signing up", req.body);
    const uniqueId = uuidv4();
    let connection;
    const { email, password, name, empNum, branch_id, image } = req.body;

    try {
        connection = await establishConnection();

        if (!isEmail(email)) {
            return res.status(400).send({ email: "Email is not valid" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .send({ password: "Password must be at least 6 characters" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            // user_id: uniqueId,
            name,
            email,
            password: hashedPassword,
            empNum,
            branch_id,
            image: image ? image : "https://i.imgur.com/VkCiPWX.png",
        };

        const userResults = await util
            .promisify(connection.query)
            .bind(connection)("INSERT INTO users SET ?", userData);

        console.log("Results ID:", userResults);

        const [user] = await connection
            .promise()
            .query("SELECT * FROM users WHERE email = ?", [email]);

        const permissionsData = {
            user_id: user[0].user_id,
            branch_ids: JSON.stringify([branch_id]),
            role: 3,
        };

        const permissionResults = await util
            .promisify(connection.query)
            .bind(connection)("INSERT INTO permissions SET ?", permissionsData);

        console.log("Permission ID:", permissionResults.insertId);

        await util.promisify(connection.query).bind(connection)(
            "UPDATE users SET permissions_id = ? WHERE user_id = ?",
            [permissionResults.insertId, user[0].user_id]
        );

        res.status(201).send(userResults);
    } catch (error) {
        // console.error("Error executing query:", error.code);
        const errors = loginErrors(error);
        // console.log("errors:", errors);
        res.status(500).send(errors);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const mylogin_post = async (req, res) => {
    const { email, password } = req.body;
    let connection;

    try {
        connection = await establishConnection();
        if (!isEmail(email)) {
            return res.status(400).send({ email: "Email is not valid" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .send({ password: "Password must be at least 6 characters" });
        }

        const [user] = await connection
            .promise()
            .query("SELECT * FROM users WHERE email = ?", [email]);
        const id = user[0].user_id;

        if (user) {
            const auth = await bcrypt.compare(password, user[0].password);
            if (auth) {
                const token = createToken(id);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });

                const [userData] = await connection
                    .promise()
                    .query(
                        "SELECT u.user_id, u.name, u.empNum, u.email, u.image, p.role, p.branch_ids FROM users u JOIN permissions p ON u.permissions_id = p.id WHERE p.user_id = ?",
                        [id]
                    );
                console.log("myuser- DATA TO SEND IN LOGIN", userData[0]);

                res.status(200).send(userData[0]);
            } else {
                res.status(400).send({ password: "Incorrect password!!" });
            }
        } else {
            res.status(400).send({ email: "Incorrect email" });
        }
    } catch (err) {
        const errors = loginErrors(err);
        res.status(400).send(errors);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

const logout_get = async (req, res) => {
    console.log("user logging out");
    const token = req;

    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).send("Logged out successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

export { Mysignup_post, mylogin_post, logout_get };
