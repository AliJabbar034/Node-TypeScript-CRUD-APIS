import express, { Request, Response } from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import log from "./logger/Logger";
import mongoConnection from "./config/db";
import errorHandler from "./middleware/errorHandler.middleware";
import userRouter from "./routes/user.router";
import { Authentication } from "./middleware/Authentication";

dotenv.config();

const app = express();
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express Server!");
});
app.use("/api/users", userRouter);

app.use(errorHandler);
app.listen(port, async () => {
  await mongoConnection();
  log.info(`Server is running on http://localhost:${port}`);
});
