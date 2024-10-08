import { Request, Response } from "express";
import { create } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utills/asyncHandler";
import { UserZodSchema } from "../models/user.model";
import logger from "../logger/Logger";

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    logger.info(req.body);

    const validatedData = UserZodSchema.parse(req.body);

    const { userName, email, password } = validatedData;

    const user = await create(email, password, userName);

    res.status(StatusCodes.OK).json({ user: user });
  }
);
