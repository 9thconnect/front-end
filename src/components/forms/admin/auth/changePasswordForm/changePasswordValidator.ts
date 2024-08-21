import { z } from "zod";

export const changePasswordValidationSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: "Old Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "New Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
