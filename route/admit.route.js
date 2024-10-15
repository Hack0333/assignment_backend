import express from 'express'

import isLoggedIn from '../middleware/auth.js';
import { login, register, assignments_accept, assignments_reject,showAssignments } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login)
authRouter.post("/assignments",isLoggedIn,showAssignments);
authRouter.patch("/assignments/:id/reject",isLoggedIn,assignments_reject)
authRouter.patch("/assignments/:id/accept",isLoggedIn,assignments_accept)

export default authRouter;