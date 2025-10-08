import pino from "pino"

const DevLogger = pino({
  level: process.env.LOG_LEVEL || "debug",
})

export default DevLogger
