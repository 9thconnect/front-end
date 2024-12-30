import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BaseResponse } from "@/type/common";
import { propertyValidationSchema } from "./propertyValidator";
import { z } from "zod";

export interface Property {
  _id?: string;
  title: string;
  description: string;
  location: {
    state: string;
    country: string;
    address: string;
  };
  price: number;
  amenities: string[];
  images: string[];
  details: {
    bedroom: number;
    bathroom: number;
    toilet: number;
    sittingRoom: number;
  };
  propertyType: {
    _id: string;
    name: string;
  };
}

export function usePropertyFormContext(property?: Property) {
  return useForm<z.infer<typeof propertyValidationSchema>>({
    resolver: zodResolver(propertyValidationSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      location: {
        state: property?.location?.state || "",
        country: property?.location?.country || "",
        address: property?.location?.address || "",
      },
      price: property?.price || undefined,
      amenities: property?.amenities || [],
      images: property?.images || [],
      details: {
        bedroom: property?.details?.bedroom || 0,
        bathroom: property?.details?.bathroom || 0,
        toilet: property?.details?.toilet || 0,
        sittingRoom: property?.details?.sittingRoom || 0,
      },
      propertyType: property?.propertyType?._id || "",
    },
  });
}

export function useAddProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProperty"],
    mutationFn: (data: z.infer<typeof propertyValidationSchema>) => {
      return requests.post("/real-estate/vendor/add-property", data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-properties"] });
    },
    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });
}

export function useEditProperty(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProperty", propertyId],
    mutationFn: (data: z.infer<typeof propertyValidationSchema>) => {
      return requests.patch(
        `/real-estate/vendor/edit-property/${propertyId}`,
        data
      );
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-properties"] });
    },
    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });
}
