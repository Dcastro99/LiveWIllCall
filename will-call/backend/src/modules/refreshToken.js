import mongoose from 'mongoose';
import TeamMemberModel from "../models/teamMember.js";

import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.status(401);
    const refreshToken = cookies.refreshToken;
    
    const foundUser = await TeamMemberModel.findOne({ refreshToken });
    console.log('foundUser here!!!!',foundUser._id);
    if (!foundUser) return res.status(403).send("User Forbidden");

   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err || !user) return res.status(403).send("Forbidden");
        
        const userId = new mongoose.Types.ObjectId(user._id); 
    
        if (!userId.equals(foundUser._id)) return res.status(403).send("Forbidden");
    
        const accessToken = jwt.sign({ "_id": userId }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );
        res.status(200).send({ accessToken });
    });
};

export { handleRefreshToken };

