import z, { object, string, email } from "zod"

export const signupSchema = object({
  email: email({ error: "Email is required" })
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters"),

  password: string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters")

    .max(128, "Password must be less than 128 characters")

    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })

    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })

    .regex(/[0-9]/, { message: "Password must contain at least one number" })

    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
})

export type SignupInput = z.infer<typeof signupSchema>
