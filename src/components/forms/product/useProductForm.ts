import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productValidationSchema } from "./productValidator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { BaseResponse, Product } from "@/type/common";

export function useProductFormContext(product?: Product) {
  return useForm<z.infer<typeof productValidationSchema>>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || undefined,
      productCategory: product?.productCategory?._id || "",
      images: product?.images || [],
      stockQuantity: product?.stockQuantity || undefined,
      minimumOrder: product?.minimumOrder || undefined,
      weight: product?.weight || undefined,
      subCategory: product?.subCategory._id || "",
      brand: product?.brand._id || "",
    },
  });
}

export function useAddProduct(data: z.infer<typeof productValidationSchema>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: () => {
      return requests.post(`/product/vendor/add-product`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: [`get-products`] });
    },

    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });
}
