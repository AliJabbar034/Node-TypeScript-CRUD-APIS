import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

export const UserZodSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "length of name should be 3 or greater than 3" }),
  email: z
    .string()
    .email("email should have format like this test@example.com"),
  password: z
    .string()
    .min(6, { message: "length of name should be 6 or greater than 6" }),
});

const UserSchema: Schema = new Schema({
  userName: {
    type: String,
    required: [true, "Provide the name of the user"],
    minLength: [3, "Length must be greater than 2"],
  },
  email: {
    type: String,
    required: [true, "Provide the email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Provide the password"],
    minLength: [6, "Length must be greater or Equal to 6 characters"],
    select: false,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
