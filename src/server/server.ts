import app from "../app.js"
import http from "http"
import logger from "../common/logger/logger.js"
import connectToDatabase from "../infrastructure/database/database.js"

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, async () => {
  logger.info("Server Starting...")
  logger.info(`Environment: ${process.env.NODE_ENV}`)

  await connectToDatabase()

  logger.info(`Server listening on port ${PORT}`)
})

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    logger.info(`Port ${PORT} is already in use.`)
    process.exit(1)
  } else {
    logger.info(`Server error: ${err.message}`)
    process.exit(1)
  }
})
