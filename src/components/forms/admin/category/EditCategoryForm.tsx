"use client";

import React from "react";
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
import { useEditCategory } from "./useAddCategory";
import { addCategoryValidationSchema } from "./addCategoryValidator";
import { z } from "zod";
import { Category, CategoryType } from "@/type/category";
import { useEditCategoryFormContext } from "./useEditCategoryFormContext copy";

const EditCategoryForm = ({
  type,
  category,
}: {
  type: CategoryType;
  category: Category;
}) => {
  const mutation = useEditCategory(type, category._id);

  const onSubmit = (data: z.infer<typeof addCategoryValidationSchema>) => {
    console.log(type);
    mutation.mutate(data);
  };

  const form = useEditCategoryFormContext(category, type);

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
                <FormLabel className="capitalize">{type}</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
          {mutation.isPending ? "Editing" : "Edit"} Category
        </Button>
      </form>
    </Form>
  );
};

EditCategoryForm.displayName = "EditCategoryForm";

export default EditCategoryForm;
