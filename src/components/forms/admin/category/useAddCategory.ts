// useAddCategory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { addCategoryValidationSchema } from "./addCategoryValidator";
import requests from "@/utils/requests";
import { CategoryType } from "@/type/category";
import { toast } from "sonner";
import { AxiosError } from "axios";

type AddCategoryData = z.infer<typeof addCategoryValidationSchema>;

export function useAddCategory(type: CategoryType, closeModel: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: (data: AddCategoryData) => {
      let body = {
        [type]: data.name,
        description: data.description,
      };

      if (type == "product") {
        body = {
          title: data.name,
          description: data.description,
        };
      }

      return requests.post(`/category/${type}/add`, body);
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: [`${type}-category`] });

      closeModel();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });
}

export function useEditCategory(type: CategoryType, id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editCategory"],
    mutationFn: (data: AddCategoryData) => {
      let body = {
        [type]: data.name,
        description: data.description,
      };

      if (type == "product") {
        body = {
          title: data.name,
          description: data.description,
        };
      }

      return requests.patch(`/category/${type}/edit/${id}`, body);
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: [`${type}-category`] });
    },

    onError: (error) => {
      toast.error("Error editing category, try again");
    },
  });
}

export function useDeleteCategory(
  type: CategoryType,
  id: string,
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: () => {
      return requests.delete(`/category/${type}/delete/${id}`);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setOpenEdit(false);

      queryClient.invalidateQueries({ queryKey: [`${type}-category`] });
    },

    onError: (error) => {
      toast.error("Error editing category, try again");
      setOpenEdit(false);
    },
  });
}
