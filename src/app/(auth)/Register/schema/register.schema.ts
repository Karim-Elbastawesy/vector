import * as zod from "zod";


export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Username is required")
      .min(2, "2 Minimum characters required.")
      .max(14, "Maximum amount of characters is 14 characters."),
    email: zod.string().nonempty("Email is required").email("Invalid email"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,}$/,
        `Minimum 8 characters in length.
        Contains at least one uppercase letter.
        Contains at least one lowercase letter.
        Contains at least one digit.
        Contains at least one special character from a specified set (e.g., @$!%*?&).
        Does not contain any whitespace.`,
      ),
    rePassword: zod.string().nonempty("Please confirm your password"),
    phone: zod
      .string()
      .nonempty("Please enter your phone number")
      .regex(/01[0125]\d{8}/, "Invalid phone number."),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "Please confirm your password.",
    path: ["rePassword"],
  });


export type registerSchemaType = zod.infer<typeof registerSchema>
