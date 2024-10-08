import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [],
});

const colorizeFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: () => new Date().toLocaleString(),
  }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}}`;
  })
);

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: colorizeFormat,
    })
  );
}

export default logger;
