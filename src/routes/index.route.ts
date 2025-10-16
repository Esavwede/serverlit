/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Express } from "express"
import logger from "../common/logger/logger.js"

export default function initializeRoutes(app: Express) {
  // auth routes
  // app.use("/api/v1", authRoutes)

  logger.info("Routes initialized")
}
