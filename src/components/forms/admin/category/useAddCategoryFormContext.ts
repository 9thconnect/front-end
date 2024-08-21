// useAddCategoryFormContext.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCategoryValidationSchema } from "./addCategoryValidator";

export function useAddCategoryFormContext() {
  return useForm<z.infer<typeof addCategoryValidationSchema>>({
    resolver: zodResolver(addCategoryValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
}
