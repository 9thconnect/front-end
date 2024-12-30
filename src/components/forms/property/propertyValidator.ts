import { z } from "zod";

export const propertyValidationSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.object({
    state: z.string().min(1, {
      message: "State is required.",
    }),
    country: z.string().min(1, {
      message: "Country is required.",
    }),
    address: z.string().min(1, {
      message: "Address is required.",
    }),
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  amenities: z.array(z.string()).min(1, {
    message: "At least one amenity is required.",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
  details: z.object({
    bedroom: z.coerce.number().min(0, {
      message: "Bedroom count must be 0 or greater.",
    }),
    bathroom: z.coerce.number().min(0, {
      message: "Bathroom count must be 0 or greater.",
    }),
    toilet: z.coerce.number().min(0, {
      message: "Toilet count must be 0 or greater.",
    }),
    sittingRoom: z.coerce.number().min(0, {
      message: "Sitting room count must be 0 or greater.",
    }),
  }),
  propertyType: z.string().min(1, {
    message: "Property type is required.",
  }),
});
