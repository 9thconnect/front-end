import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  stockQuantity: z.coerce.number().min(1, {
    message: "Stock quantity must be at least 1.",
  }),
  productCategory: z.string().min(1, {
    message: "Category is required.",
  }),
  subCategory: z.string().min(1, {
    message: "Sub Category is required.",
  }),
  brand: z.string().optional(),
  weight: z.coerce.number().min(1, {
    message: "Weight must be at least 1.",
  }),
  minimumOrder: z.coerce.number().optional(),

  images: z.string().array(),
});
