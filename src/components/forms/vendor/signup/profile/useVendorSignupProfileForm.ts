"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vendorSignupProfileValidationSchema } from "./vendorSignupProfileValidator";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";

export function useVendorSignupProfileForm(formStateData: VendorSignUpRequest) {
  return useForm<z.infer<typeof vendorSignupProfileValidationSchema>>({
    resolver: zodResolver(vendorSignupProfileValidationSchema),
    defaultValues: {
      email: formStateData.email,
      phone: formStateData.phoneNumber,
      fullName: formStateData.fullName,
    },
  });
}
