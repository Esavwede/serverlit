import app from "../app.js"
import http from "http"
import logger from "../common/logger/logger.js"
import connectToDatabase from "../infrastructure/database/database.js"
import { createTerminus } from "@godaddy/terminus"
import mongoose from "mongoose"

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, async () => {
  logger.info("Server Starting...")
  logger.info(`Environment: ${process.env.NODE_ENV}`)

  await connectToDatabase()

  logger.info(`Server listening on port ${PORT}`)
})

/* Graceful Shutdown */

// shutdown handler
async function onSignal(): Promise<void> {
  logger.info("Closing database connections")
  await mongoose.connection.close()
  await new Promise((resolve) => setTimeout(resolve, 200))
  logger.info("Database connections closed")
}

// shutdown-complete handler
async function onShutdown(): Promise<void> {
  logger.info("Cleanup Finished, server is shutting down")
  await new Promise((resolve) => setTimeout(resolve, 200))
  return Promise.resolve()
}

// Grafeful Shutdown with Terminus
createTerminus(server, {
  signals: ["SIGINT", "SIGTERM"],
  beforeShutdown: () => new Promise((resolve) => setTimeout(resolve, 5000)),
  onSignal,
  onShutdown,
  timeout: 10000,
})

/** Error Hanlding*/

// Server Error
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    logger.info(`Port ${PORT} is already in use.`)
    process.exit(1)
  } else {
    logger.info(`Server error: ${err.message}`)
    process.exit(1)
  }
})

// Process-level error
process.on("uncaughtException", (e) => {
  logger.error(`Uncaught Exception: ${e}`)
  process.exit(1)
})

// Process-level error
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection at Promise: ${reason}`)

  server.close(() => {
    logger.info("Server closed due to unhandled promise rejection")
    process.exit(1)
  })
})
