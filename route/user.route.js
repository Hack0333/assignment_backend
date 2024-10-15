import express from "express";

import isLoggedIn from "../middleware/auth.js";
import { userLogin, userRegister, userUpload, userLogout , allAdmins } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post('/register',userRegister);

userRouter.post('/login',userLogin);

userRouter.post('/logout',userLogout);

userRouter.post('/upload',isLoggedIn,userUpload);

userRouter.get('/all_admins',allAdmins);


export default userRouter;