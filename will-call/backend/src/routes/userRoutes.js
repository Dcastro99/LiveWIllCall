import { Router } from "express";

import {
    mygetAllUsers,
    mygetUser,
    add_permissions,
    get_permissions,
    removeBranchId,
    forgotPassword,
    resetPassword,
} from "../modules/users.js";

const userRouter = Router();

userRouter.post("/permissions", add_permissions);
userRouter.post("/getpermissions", get_permissions);
userRouter.get("/myuser", mygetUser);
userRouter.post("/myusers", mygetAllUsers);
userRouter.post("/removeBranchId", removeBranchId);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);

export default userRouter;
