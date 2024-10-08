class AppError extends Error {
  statusCode: number;

  constructor(messsage: string, statusCode: number) {
    super(messsage);
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
