// import dotenv from "dotenv";
// dotenv.config();
// import jwt from "jsonwebtoken";

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) return res.status(401).send("Access Denied");
//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).send("Access Denied");
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
//         if (err) return res.status(403).send("Invalid Token");
//         console.log('id',id);
//         req.id = id;
//         console.log('req.id',req.id);
//         next();
//     }
//     );
// }
// export default verifyJWT;