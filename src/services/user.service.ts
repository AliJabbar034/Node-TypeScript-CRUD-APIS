import User, { IUser } from "../models/user.model";
import AppError from "../utills/AppError";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utills/passwordHandler";

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

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    email,
    userName,
    password: hashedPassword,
  });

  if (!user) {
    throw new AppError(
      "Couldn't create user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  return user;
};

export const login = async (
  email: string,
  password: string
): Promise<IUser> => {
  const isUserExist = await findOneByEmail(email);
  if (!isUserExist) {
    throw new AppError("Invalid Email or Password", StatusCodes.NOT_FOUND);
  }
  const isPasswordMatch = await comparePassword(isUserExist.password, password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid email or password", StatusCodes.NOT_FOUND);
  }

  return isUserExist;
};

export const findoneById = async (id: string): Promise<IUser> => {
  const user: IUser | null = await User.findById(id);
  if (!user) {
    throw new AppError("No User Found", StatusCodes.NOT_FOUND);
  }
  return user;
};
const findOneByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email }).select("-__v +password");

  return user;
};

export const allUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await User.find();

  if (users.length === 0) {
    throw new AppError("No User Found", StatusCodes.NOT_FOUND);
  }
  return users;
};
