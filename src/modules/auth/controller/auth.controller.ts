import type { Request, Response, NextFunction } from "express"
import { signupSchema } from "../schema/auth.schema.js"
import EmailPassword from "supertokens-node/recipe/emailpassword"
import logger from "../../../common/logger/logger.js"
import type { EmailService } from "../../../infrastructure/email/email.service.js"

export function makeAuthController(emailService: EmailService) {
  return {
    async signup(req: Request, res: Response, next: NextFunction) {
      logger.info("signing up user with email ")

      try {
        const parseResult = signupSchema.safeParse(req.body)

        if (!parseResult.success) {
          logger.error("Bad user signup data")
          return res.status(400).json({ errors: parseResult.error })
        }

        const { email, password } = parseResult.data

        const signUpResponse = await EmailPassword.signUp(
          "public",
          email,
          password,
        )

        if (signUpResponse.status === "EMAIL_ALREADY_EXISTS_ERROR") {
          logger.error("Email already in use")
          return res.status(201).json({ error: "User signed up" }) // security reasons ( message )
        }

        // send verification email
        await emailService.sendVerificationEmail(email)

        logger.info("User signed up successfully")
        return res.status(201).send("User signed up")
      } catch (e) {
        next(e)
      }
    },
  }
}
