import { Router } from "express";
import multer from "multer";

import {
    Mysignup_post,
    mylogin_post,
    logout_get,
} from "../controllers/authCortlMysql.js";


const authRouter = Router();

authRouter.post("/mysignup",  Mysignup_post);
authRouter.post("/mylogin", mylogin_post);
// router.post("/login", login_post);
authRouter.get("/logout", logout_get);

export default authRouter;
