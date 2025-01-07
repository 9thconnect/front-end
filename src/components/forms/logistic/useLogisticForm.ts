import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BaseResponse } from "@/type/common";
import { Logistics } from "@/type/logistics";
import { fleetValidationSchema } from "./logisticValidator";

export function useFleetFormContext(fleet?: Logistics) {
  return useForm<z.infer<typeof fleetValidationSchema>>({
    resolver: zodResolver(fleetValidationSchema),
    defaultValues: {
      title: fleet?.title || "",
      registration: fleet?.registration || "",
      details: fleet?.details || "",
      logisticType: fleet?.logisticType || "road",
      logisticSubType: fleet?.logisticSubType || "",
      capacity: fleet?.capacity || undefined,
      fuelType: fleet?.fuelType || "",
      image: fleet?.image || "",
      ratePerKg: fleet?.ratePerKg || undefined,
      ratePerKilometer: fleet?.ratePerKilometer || undefined,
    },
  });
}

export function useAddFleet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addFleet"],
    mutationFn: (data: z.infer<typeof fleetValidationSchema>) => {
      return requests.post("/logistic/vendor/add-fleet", data);
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

export function useEditFleet(fleetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editFleet", fleetId],
    mutationFn: (data: z.infer<typeof fleetValidationSchema>) => {
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
