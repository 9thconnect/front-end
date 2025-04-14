import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BaseResponse } from "@/type/common";
import { Logistics } from "@/type/logistics";
import { fleetValidationSchema } from "./logisticValidator";

const defaultValues = {
  title: "",
  registration: "",
  details: "",
  logisticType: "road" as const,
  logisticSubType: "",
  capacity: undefined,
  fuelType: "",
  image: "",
  ratePerKg: undefined,
  ratePerKilometer: undefined,
};

export function useFleetFormContext(fleet?: Logistics) {
  return useForm<z.infer<typeof fleetValidationSchema>>({
    resolver: zodResolver(fleetValidationSchema),
    defaultValues: {
      title: fleet?.title || "",
      registration: fleet?.registration || "",
      details: fleet?.details || "",
      logisticType: fleet?.logisticType || "road",
      logisticSubType: fleet?.logisticSubType,
      capacity: fleet?.capacity || undefined,
      fuelType: fleet?.fuelType || "",
      image: fleet?.image || "",
      ratePerKg: fleet?.ratePerKg || undefined,
      ratePerKilometer: fleet?.ratePerKilometer || undefined,
    },
  });
}

type MutationData = {
  data: z.infer<typeof fleetValidationSchema>;
  form: UseFormReturn<z.infer<typeof fleetValidationSchema>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useAddFleet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addFleet"],
    mutationFn: ({ data }: MutationData) => {
      return requests.post("/logistic/vendor/add-fleet", data);
    },
    onSuccess: (response, { form, setOpen }) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["get-fleets"] });
      form.reset();
      setOpen(false);
    },
    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });
}

export function useEditFleet(fleetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editFleet", fleetId],
    mutationFn: ({ data }: MutationData) => {
      return requests.patch(`/logistic/vendor/edit-fleet/${fleetId}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-fleets"] });
    },
    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });
}
