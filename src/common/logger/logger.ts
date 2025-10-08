import ProdLogger from "./prod/prod-logger.js"
import DevLogger from "./dev/dev-logger.js"

const logger = process.env.NODE_ENV === "production" ? ProdLogger : DevLogger

export default logger
