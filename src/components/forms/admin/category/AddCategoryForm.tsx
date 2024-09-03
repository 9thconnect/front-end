// AddCategoryForm.tsx
"use client";

import React from "react";
import { useAddCategoryFormContext } from "./useAddCategoryFormContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddCategory } from "./useAddCategory";
import { addCategoryValidationSchema } from "./addCategoryValidator";
import { z } from "zod";
import { CategoryType } from "@/type/category";

const AddCategoryForm = ({
  type,
  closeModel,
  category,
}: {
  type: CategoryType;
  category?: string;
  closeModel: () => void;
}) => {
  const mutation = useAddCategory(type, closeModel, category);

  const onSubmit = (data: z.infer<typeof addCategoryValidationSchema>) => {
    console.log(type);
    mutation.mutate(data);
  };

  const form = useAddCategoryFormContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center justify-center flex-col gap-5 py-5"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={mutation.isPending} className="w-full" type="submit">
          {mutation.isPending ? "Adding" : "Add"}
          {category ? " Sub Category" : "Category"}
        </Button>
      </form>
    </Form>
  );
};

AddCategoryForm.displayName = "AddCategoryForm";

export default AddCategoryForm;
