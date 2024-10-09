import { IUser } from "./../models/user.model";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utills/asyncHandler";
import { StatusCodes } from "http-status-codes";
import AppError from "../utills/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findoneById } from "../services/user.service";
export const Authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized access", StatusCodes.UNAUTHORIZED);
    }

    const validateToken = (await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || ""
    )) as JwtPayload;

    let user: IUser | null = null;
    if (
      validateToken &&
      typeof validateToken === "object" &&
      validateToken._id
    ) {
      user = await findoneById(validateToken._id);
    }
    if (!user) {
      throw new AppError("Unauthorized access", StatusCodes.UNAUTHORIZED);
    }

    console.log(req);

    next();
  }
);
