import { z } from "zod";

// Define the valid logistic types from the API
const logisticTypeEnum = z.enum(["road", "rail", "air", "sea", "interModal"]);

// Define all possible subtypes from the API
const subtypeEnum = z.enum([
  "bike",
  "truck",
  "van",
  "LTL",
  "internodalRail",
  "unitTrain",
  "cargoAirline",
  "containerShip",
]);

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
  logisticType: logisticTypeEnum,
  logisticSubType: subtypeEnum,
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

// Export the type
export type FleetFormValues = z.infer<typeof fleetValidationSchema>;
