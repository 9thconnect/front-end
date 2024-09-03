import { z } from "zod";

export const checkoutValidationSchema = z.object({
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  posterCode: z.string().min(2, {
    message: "Poster Code must be at least 2 characters.",
  }),
});
