/* Express */

import cookieParser from "cookie-parser"
import express from "express"
import type { Request, Response, NextFunction } from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import logger from "./common/logger/logger.js"

const app = express()

/* Middlewares */

// Parsers
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// security
app.use(cors())
app.use(helmet())
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour",
  }),
)

// performance
app.use(compression())

/* Routes */

// health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server healthy",
  })
})

/* Error handling */

app.use((req, res) => {
  logger.error(" route not found " + req.path)
  res.status(404).json({ status: "fail" })
})

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("App error handler " + err)
  res.status(500).json({ status: "error" })
})

export default app
