"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkoutValidationSchema } from "./checkoutValidator";

export function useCheckoutFormContext() {
  return useForm<z.infer<typeof checkoutValidationSchema>>({
    resolver: zodResolver(checkoutValidationSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      country: "",
      posterCode: "",
    },
  });
}
