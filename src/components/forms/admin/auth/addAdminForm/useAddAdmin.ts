import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addAdminValidationSchema } from "./addAdminValidator";

export function useAddAdminFormContext() {
  return useForm<z.infer<typeof addAdminValidationSchema>>({
    resolver: zodResolver(addAdminValidationSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      role: "",
    },
  });
}
