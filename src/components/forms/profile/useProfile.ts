import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileValidationSchema } from "./profileValidator";

export function useProfileFormContext() {
  return useForm<z.infer<typeof profileValidationSchema>>({
    resolver: zodResolver(profileValidationSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      city: "",
      firstName: "",
      lastName: "",
      posterCode: "",
    },
  });
}
