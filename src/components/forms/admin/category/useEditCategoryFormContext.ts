import { Category, CategoryType } from "@/type/category";
// useAddCategoryFormContext.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCategoryValidationSchema } from "./addCategoryValidator";

export function useEditCategoryFormContext(
  category: Category,
  type: CategoryType
) {
  console.log(category);
  return useForm<z.infer<typeof addCategoryValidationSchema>>({
    resolver: zodResolver(addCategoryValidationSchema),

    defaultValues: {
      name: category.title,
      description: category.description,
    },
  });
}
