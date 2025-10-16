import rateLimit from "express-rate-limit"

const authRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
})
// src\common\middleware\security\rate-limiter

export { authRateLimiter }
