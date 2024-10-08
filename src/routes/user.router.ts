import express from "express";
import { createUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/create").post(createUser);

export default userRouter;
