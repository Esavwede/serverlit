import { Router } from "express"
import { authRateLimiter } from "../../../common/middleware/security/rate-limiter.js"
import { makeAuthController } from "../controller/auth.controller.js"
import { EmailService } from "../../../infrastructure/email/email.service.js"

const router = Router()
const emailService = new EmailService()
const authController = makeAuthController(emailService)

router.post("/signup", authRateLimiter, authController.signup)

export default router
