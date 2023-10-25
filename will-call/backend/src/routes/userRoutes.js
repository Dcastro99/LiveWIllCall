import { Router } from "express";
import { checkUser } from "../middleware/validate.js";

import {
    getAllUsers,
    getUser,
    add_permissions,
    get_permissions,
    removeBranchId,
    forgotPassword,
    resetPassword,
    deleteUser,
    addUserImage,
    adminResetPassword
} from "../modules/users.js";

const userRouter = Router();

userRouter.post("/permissions", add_permissions);
userRouter.post("/getpermissions", get_permissions);
userRouter.get("/user", getUser);
userRouter.post("/users", getAllUsers);
userRouter.post("/removeBranchId", removeBranchId);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);
userRouter.post("/deleteUser", deleteUser);
userRouter.post("/addUserImage", addUserImage);
userRouter.post("/adminResetPassword",checkUser, adminResetPassword);

export default userRouter;
