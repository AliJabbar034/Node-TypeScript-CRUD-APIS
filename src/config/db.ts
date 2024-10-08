import mongoose from "mongoose";
import logger from "../logger/Logger";

const mongoConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => {
      logger.info("Connection established");
    })
    .catch((error) => {
      logger.error("Error connecting to Mongo", error);
      process.exit(1);
    });
};

export default mongoConnection;
