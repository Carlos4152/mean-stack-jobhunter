
import express from "express";
import { registerController, loginController } from "../controllers/userController.js";

const userRouter = express.Router()

// POST REGISTER USER
userRouter.post("/registration", registerController);

// POST LOGIN USER
userRouter.post("/login", loginController);


export { userRouter }