"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vendorSignupProfileValidationSchema } from "./vendorSignupProfileValidator";

export function useVendorSignupProfileForm() {
  return useForm<z.infer<typeof vendorSignupProfileValidationSchema>>({
    resolver: zodResolver(vendorSignupProfileValidationSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
  });
}
