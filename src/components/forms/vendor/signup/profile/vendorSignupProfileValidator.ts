import { z } from "zod";

export const vendorSignupProfileValidationSchema = z.object({
  fullName: z.string().min(2, {
    message: "full name must be at least 2 characters.",
  }),

  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  phone: z
    .string()
    .min(11, {
      message: "phone must be at least 11 characters.",
    })
    .max(11, {
      message: "phone must be at most 11 characters.",
    }),

  gender: z
    .string({
      required_error: "Please select a gender",
    })
    .optional(),
});
