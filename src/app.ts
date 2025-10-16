/* Express */

import cookieParser from "cookie-parser"
import express from "express"
import type { Request, Response, NextFunction } from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import rateLimit from "express-rate-limit"
import logger from "./common/logger/logger.js"
import initializeRoutes from "./routes/index.route.js"
import initializeSuperTokens from "./config/auth/supertokens.js"
import { errorHandler, middleware } from "supertokens-node/framework/express"
import authRoutes from "./modules/auth/routes/auth.routes.js"

/* SuperTokens */
initializeSuperTokens()

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

// Auth Routes
// bypassing supertokens for auth routes
app.use("/api/v1", authRoutes)

// supertokens
app.use(middleware())

/* Routes */
initializeRoutes(app)

/* Error handling */

// supertokens
app.use(errorHandler())

// 404
app.use((req, res) => {
  logger.error(" route not found " + req.path)
  res.status(404).json({ status: "fail" })
})

// Global error handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err }, "App error handler ")
  res.status(500).json({ status: "error" })
})

export default app
