import { Request, Response, NextFunction } from "express";
import AppError from "../utills/AppError";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  if (err instanceof z.ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: err.errors });
    return;
  }
  res.status(statusCode).json({
    message: message,
  });
};

export default errorHandler;
