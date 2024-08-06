import { z } from "zod";

export const checkoutValidationSchema = z.object({
  firstName: z.string().min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters.",
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
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  city: z.string().optional(),
  posterCode: z.string().optional(),
});
