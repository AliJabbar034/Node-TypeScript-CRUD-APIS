import { Authentication } from "./../middleware/Authentication";
import express from "express";
import {
  createUser,
  getAllUsers,
  getAUser,
  loginUser,
} from "../controllers/user.controller";

const userRouter = express.Router();
userRouter.route("/").get(getAllUsers);
userRouter.route("/create").post(createUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/:id").get(Authentication, getAUser);

export default userRouter;
