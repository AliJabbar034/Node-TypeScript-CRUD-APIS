import User, { IUser } from "../models/user.model";
import AppError from "../utills/AppError";
import { StatusCodes } from "http-status-codes";

export const create = async (
  email: string,
  password: string,
  userName: string
): Promise<IUser | null> => {
  const isUserExist = await findOneByEmail(email);

  if (isUserExist) {
    throw new AppError(
      "User with this email already exists",
      StatusCodes.CONFLICT
    );
  }

  const user = await User.create({
    email,
    userName,
    password,
  });

  if (!user) {
    throw new AppError(
      "Couldn't create user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  return user;
};

export const update = (): string => {
  return "updating";
};

const findOneByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });

  return user;
};
