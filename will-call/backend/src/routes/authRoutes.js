import { Router } from "express";
import multer from "multer";

import {
    signup_post,
    login_post,
    logout_get,
} from "../controllers/authCortlMysql.js";

const authRouter = Router();

authRouter.post("/signup", signup_post);
authRouter.post("/login", login_post);
authRouter.get("/logout", logout_get);

export default authRouter;
