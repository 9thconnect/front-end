import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileValidationSchema } from "./profileValidator";
import { IVendor } from "@/type/users";

export function useProfileFormContext(vendor: IVendor) {
  console.log(vendor?.fullName);
  return useForm<z.infer<typeof profileValidationSchema>>({
    resolver: zodResolver(profileValidationSchema),
    defaultValues: {
      phone: vendor?.phoneNumber,
      address: "",
      city: "",
      fullName: vendor?.fullName,
      posterCode: "",
      gender: vendor?.gender,
    },
  });
}
