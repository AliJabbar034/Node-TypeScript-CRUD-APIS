import { Request, Response } from "express";
import { allUsers, create, findoneById, login } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utills/asyncHandler";
import { IUser, loginUserDto, UserZodSchema } from "../models/user.model";
import logger from "../logger/Logger";
import AppError from "../utills/AppError";

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    logger.info(req.body);

    const validatedData = UserZodSchema.parse(req.body);

    const { userName, email, password } = validatedData;

    const user = await create(email, password, userName);

    res.status(StatusCodes.OK).json({ user: user });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = loginUserDto.parse(req.body);

    const { email, password } = validatedData;

    const user: IUser = await login(email, password);
    const token = user.generateToken();
    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  }
);

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await allUsers();
    res.status(StatusCodes.OK).json({
      users,
    });
  }
);

export const getAUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Provide the Id", StatusCodes.BAD_REQUEST);
    }
    const user: IUser = await findoneById(id);
    res.status(StatusCodes.OK).json({
      user,
    });
  }
);
