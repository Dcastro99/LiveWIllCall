import dotenv from "dotenv";
import { establishConnection } from "../../server.js";

dotenv.config();
import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("Access Denied");
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) res.status(403).send("Invalid Token");
        console.log("valid token");
        req.id = decodedToken.id;
        next();
    });
};

//-------------------CHECK USER FUNCTION-------------------//

const checkUser = (req, res, next) => {
    console.log("checking user!");
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).send("Access Denied Not Authorized");
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    let connection;
    if (token !== 'null') {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    console.log("err.message in validate>>>", err.message);
                    res.locals.user = null;
                    next();
                } else {
                    try {
                        connection = await establishConnection();
                        const [user] = await connection
                            .promise()
                            .query("SELECT * FROM users WHERE user_id = ?", [
                                decodedToken.id,
                            ]);
                        if (user.length > 0) {
                            res.locals.user = user[0];
                        } else {
                            res.locals.user = null;
                        }
                    } catch (err) {
                        console.error(err);
                        res.locals.user = null;
                    }
                    next();
                }
            }
        );
    } else {
        res.locals.user = null;
        next();
    }
};

export { requireAuth, checkUser };
