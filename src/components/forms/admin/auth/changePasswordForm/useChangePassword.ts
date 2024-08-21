import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePasswordValidationSchema } from "./changePasswordValidator";

export function useChangePasswordFormContext() {
  return useForm<z.infer<typeof changePasswordValidationSchema>>({
    resolver: zodResolver(changePasswordValidationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
}
