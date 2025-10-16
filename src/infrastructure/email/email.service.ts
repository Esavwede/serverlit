import { Resend } from "resend"
import logger from "../../common/logger/logger.js"

export interface IEmailService {
  // eslint-disable-next-line no-unused-vars
  sendVerificationEmail(to: string, verificationLink: string): Promise<void>
}

const resend = new Resend(process.env.RESEND_API_KEY!)

export class EmailService implements IEmailService {
  private origin: string
  constructor(origin = process.env.API_DOMAIN || "http://localhost:3000") {
    this.origin = origin
  }

  async sendVerificationEmail(to: string) {
    const { data, error: err } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: "Welcome to Build Spree! Please verify your email",
      html: "<strong>verify email</strong>",
    })

    if (err) {
      logger.error(err, "Error sending signup email")
      throw err
    }

    logger.info(data, "Signup email sent")
  }
}
