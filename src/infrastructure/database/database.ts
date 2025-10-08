import mongoose from "mongoose"
import logger from "../../common/logger/logger.js"

async function connectToDatabase() {
  try {
    if (!process.env.DB_URI) {
      logger.error(`DB_URI not found. URI: ${process.env.DB_URI}`)
      process.exit(1)
    }

    mongoose.connection.on("connected", () => {
      logger.info("Database connected")
    })

    mongoose.connection.on("error", (e) => {
      logger.error(`Mongoose Connection Error: ${e}`)
    })

    await mongoose.connect(process.env.DB_URI)
  } catch (e) {
    logger.error(`Database Error: ${e}`)
  }
}

export default connectToDatabase
