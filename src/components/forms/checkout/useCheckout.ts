"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkoutValidationSchema } from "./checkoutValidator";

export function useCheckoutFormContext(locationData: {
  country: string;
  state: string;
  city: string;
  address: string;
}) {
  console.log("locationData", locationData);

  return useForm<z.infer<typeof checkoutValidationSchema>>({
    resolver: zodResolver(checkoutValidationSchema),
    defaultValues: {
      address: locationData.address,
      city: locationData.city,
      state: locationData.state,
      country: locationData.country,
      posterCode: "",
    },
  });
}
