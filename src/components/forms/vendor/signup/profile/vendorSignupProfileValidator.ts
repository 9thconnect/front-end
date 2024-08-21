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
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
});
