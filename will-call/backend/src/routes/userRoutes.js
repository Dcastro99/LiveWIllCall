import { Router } from "express";

import {
    getAllUsers,
    getUser,
    add_permissions,
    get_permissions,
    removeBranchId,
    forgotPassword,
    resetPassword,
<<<<<<< HEAD
    deleteUser
=======
   
>>>>>>> 2e84e01a4a40b68dfd7befa65720fe9e845476d4
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

export default userRouter;
