import { z } from "zod";
export const fleetValidationSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  registration: z.string().min(2, {
    message: "Registration number is required.",
  }),
  details: z.string().min(10, {
    message: "Details must be at least 10 characters.",
  }),
  logisticType: z.enum(["road", "air", "sea"]),
  logisticSubType: z.string().min(1, {
    message: "Sub type is required.",
  }),
  capacity: z.coerce.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  fuelType: z.string().min(1, {
    message: "Fuel type is required.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  ratePerKg: z.coerce.number().min(0, {
    message: "Rate per KG must be 0 or greater.",
  }),
  ratePerKilometer: z.coerce.number().min(0, {
    message: "Rate per kilometer must be 0 or greater.",
  }),
});
