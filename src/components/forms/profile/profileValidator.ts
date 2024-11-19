import { z } from "zod";

export const profileValidationSchema = z.object({
  fullName: z.string().min(2, {
    message: "full name must be at least 2 characters.",
  }),
  gender: z.string({
    required_error: "Please select a gender",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  posterCode: z.string().optional(),
});
