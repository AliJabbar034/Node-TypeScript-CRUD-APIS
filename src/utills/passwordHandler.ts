import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const passwordHashed = await bcrypt.hash(password, 10);
  return passwordHashed;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(password, hashedPassword);

  return isMatched;
};
