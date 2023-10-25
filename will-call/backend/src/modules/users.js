import { getConnection, executeQuery } from "../../server.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendEmail } from "../handlers/email.js";

//-------------------GET ALL USERS-------------------//

const getAllUsers = async (req, res, next) => {
    // const myUser = res.locals.user;
    // console.log("branch id get all users", req.body.branch_id);
    const id = req.body.branch_id;
    const idArray = [id];
    let connection;

    try {
        connection = await getConnection();

        const [userData] = await executeQuery(
            "SELECT u.user_id, u.name, u.empNum, u.email, u.image, p.role, p.branch_ids FROM users u JOIN permissions p ON u.permissions_id = p.id WHERE JSON_CONTAINS(CAST(p.branch_ids AS JSON), ? )AND u.emp_status = 1",
            [JSON.stringify(idArray)]
        );

        console.log("userData", userData);
        res.status(200).send(userData);
        // res.status(200).json({userData});
    } catch (err) {
        next(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------GET ONE USER-------------------//

const getUser = async (req, res, next) => {
    // console.log("Do i ever get used??????????");
    const myUser = res.locals.user;
    // console.log("myuser", myUser);

    let connection;

    try {
        if (myUser === null) {
            res.status(404).send("User not found");
            return;
        } else {
            const id = myUser.user_id;
            // connection = await establishConnection();
            connection = await getConnection();
            const [user] = await executeQuery(
                "SELECT u.user_id, u.name, u.empNum, u.new_emp, u.email, u.image, p.role, p.branch_ids FROM users u JOIN permissions p ON u.permissions_id = p.id WHERE p.user_id = ?",
                [id]
            );
            console.log("myuser- getOne", user);

            if (user.length > 0) {
                const userObj = {
                    name: user[0].name,
                    image: user[0].image,
                    email: user[0].email,
                    empNum: user[0].empNum,
                    role: user[0].role,
                    branch_ids: user[0].branch_ids,
                    user_id: user[0].user_id,
                    new_emp: user[0].new_emp,
                };
                // console.log("user", userObj);
                res.status(200).send(userObj);
            } else {
                res.status(404).send("User not found");
            }
        }
    } catch (err) {
        next(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------DELETE USER-------------------//

const deleteUser = async (req, res) => {
    console.log("user deleting", req.body);
    let connection;
    const { user_id } = req.body;
    try {
        // connection = await establishConnection();
        connection = await getConnection();
        await executeQuery(
            "UPDATE users SET emp_status= 0  WHERE user_id = ?",
            [user_id]
        );
        res.status(200).send("User deleted successfully");
    } catch (err) {
        console.error(err);
    }
};

//-------------------ADD PERMISSIONS FUNCTION-------------------//

const addBranchIdsAndRole = async (userId, newBranchIds, role) => {
    let connection;
    try {
        // connection = await establishConnection();
        connection = await getConnection();
        const [row] = await executeQuery(
            "SELECT branch_ids, role FROM permissions WHERE user_id = ?",
            [userId]
        );
        const currentBranchIds = (row[0].branch_ids || [])
            .map((id) => parseInt(id))
            .filter((id) => !isNaN(id));
        const newBranchId = parseInt(newBranchIds);

        let updatedRole = role;

        if (isNaN(newBranchId)) {
            console.error(`Invalid branch ID ${newBranchIds}`);
            return;
        }

        if (role === "") {
            updatedRole = row[0].role;
        }

        const updatedBranchIds = [
            ...new Set([...currentBranchIds, newBranchId]),
        ];
        // console.log("updatedBranchIds", updatedBranchIds);
        await executeQuery(
            "UPDATE permissions SET branch_ids = ?, role = ? WHERE user_id = ?",
            [JSON.stringify(updatedBranchIds), updatedRole, userId]
        );

        // console.log(`Added new branch IDs and role for user ${userId}`);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------ADD PERMISSIONS-------------------//

const add_permissions = async (req, res) => {
    // console.log("user adding permissions", req.body);
    let connection;
    const { email, branch_ids, role } = req.body;

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [user] = await executeQuery(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        // console.log("myuser- getOne", user[0].user_id);

        if (user[0].user_id) {
            await addBranchIdsAndRole(user[0].user_id, branch_ids, role);
            res.status(200).send("Permissions added successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------GET PERMISSIONS-------------------//

const get_permissions = async (req, res) => {
    // console.log("user getting permissions", req.body);
    let connection;
    const { email } = req.body;
    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [user] = await executeQuery(
            "SELECT u.user_id,u.email,u.name, p.role, p.branch_ids FROM users u JOIN permissions p ON u.permissions_id = p.id WHERE u.email = ?",
            [email]
        );
        // console.log("user", user[0]);
        if (user[0] === undefined) {
            console.log("User not found");
            res.status(404).send("User not found");
        } else {
            res.status(200).send(user[0]);
        }

        // console.log("User with Permissions:", user[0]);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------REMOVE BRANCH ID FUNCTION-------------------//

const removeUserIdBranchId = async (userId, branchId) => {
    let connection;
    console.log("userId", userId);
    console.log("branchId", branchId);
    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [row] = await executeQuery(
            "SELECT branch_ids FROM permissions WHERE user_id = ?",
            [userId]
        );
        console.log("row", row);

        const currentBranchIds = row[0].branch_ids || "[]";
        console.log("currentBranchIds", currentBranchIds);

        const updatedBranchIds = currentBranchIds.filter(
            (id) => id !== branchId
        );

        await executeQuery(
            "UPDATE permissions SET branch_ids = ? WHERE user_id = ?",
            [JSON.stringify(updatedBranchIds), userId]
        );

        console.log(`Removed branch ID ${branchId} for user ${userId}`);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------REMOVE BRANCH ID-------------------//

const removeBranchId = async (req, res) => {
    console.log("branchId being removed", req.body);
    let connection;
    const { email, branch_ids } = req.body;

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [user] = await executeQuery(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        console.log("myuser- getOne", user[0].user_id);

        if (user[0].user_id) {
            await removeUserIdBranchId(user[0].user_id, branch_ids);
            res.status(200).send("Permissions added successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------PASSWORD RESET TOKEN-------------------//

const forgotPassword = async (req, res) => {
    console.log("email", req.body);
    let connection;
    const { email } = req.body;

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [user] = await executeQuery(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        console.log("myuser- getOne", user[0].user_id);
        const id = user[0].user_id;
        if (id) {
            await executeQuery(
                "UPDATE users SET password_reset_token = ?, password_reset_exp = ? WHERE email = ?",
                [hashedToken, resetExpires, email]
            );

            const resetURL = `http://localhost:3000/?token=${resetToken}`;

            // const resetURL = `${req.protocol}://${req.get(
            //     "host"
            // )}/resetPassword/${resetToken}`;

            const messege =
                "We have received a request to reset your password. Please click on the link below to reset your password. \n\n" +
                resetURL +
                "\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n";

            try {
                await sendEmail({
                    email: email,
                    subject: "Password reset request received",
                    messege: messege,
                });
                res.status(200).send("Email sent successfully");
            } catch (err) {
                await connection
                    .promise()
                    .query(
                        "UPDATE users SET password_reset_token = ?, password_reset_exp = ? WHERE email = ?",
                        [null, null, email]
                    );
                res.status(400).send(
                    "There was an error sending the email. Try again later!"
                );
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//--------------------PASSWORD RESET-------------------//

const resetPassword = async (req, res) => {
    console.log("reset password", req.params);
    console.log("reset password", req.body);
    const token = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    let connection;

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        const [user] = await executeQuery(
            "SELECT * FROM users WHERE password_reset_token = ? AND password_reset_exp > ?",
            [token, Date.now()]
        );
        console.log("myuser- getOne", user[0].user_id);
        const id = user[0].user_id;
        if (id !== undefined) {
            if (req.body.password === req.body.passwordConfirm) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await executeQuery(
                    "UPDATE users SET password = ?, password_reset_token = ?, password_reset_exp = ? WHERE user_id = ?",
                    [hashedPassword, null, null, id]
                );
                res.status(200).send("Password reset successfully");
            } else {
                res.status(400).send("Passwords do not match");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------------------ADD USER IMAGE-----------------------------//

const addUserImage = async (req, res) => {
    console.log("req.file", req.body);

    let connection;
    const { userId, image } = req.body;

    if (userId === 0) {
        res.status(404).send("User not found");
    }

    try {
        // connection = await establishConnection();
        connection = await getConnection();
        await executeQuery("UPDATE users SET image = ? WHERE user_id = ?", [
            image,
            userId,
        ]);
        res.status(200).send("Image added successfully");
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

//-------------------------------- ADMIN RESET PASSWORD -------------------------------//

const adminResetPassword = async (req, res) => {
    console.log("reset password", req.body);

    const { password, confirmPassword, id } = req.body;

    let connection;

    try {
        // connection = await establishConnection();
        connection = await getConnection();

        if (password === confirmPassword) {
            console.log("passwords match");
            const hashedPassword = await bcrypt.hash(password, 10);
            await executeQuery(
                "UPDATE users SET password = ?, new_emp = 0 WHERE user_id = ?",
                [hashedPassword, id]
            );
            res.status(200).send("Password reset successfully");
            console.log("password reset");
        } else {
            res.status(400).send("Passwords do not match");
            console.log("passwords do not match");
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            // connection.end();
            connection.release();
        }
    }
};

export {
    getAllUsers,
    getUser,
    add_permissions,
    get_permissions,
    removeBranchId,
    forgotPassword,
    resetPassword,
    deleteUser,
    addUserImage,
    adminResetPassword,
};
