import pino from "pino"

const ProdLogger = pino({
  level: process.env.LOG_LEVEL || "info",
})

export default ProdLogger
