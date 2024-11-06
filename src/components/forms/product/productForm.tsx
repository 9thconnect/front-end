"use client";

import React, { forwardRef, useEffect } from "react";
import { useAddProduct, useProductFormContext } from "./useProductForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { productValidationSchema } from "./productValidator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/common/imageUpload";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import cn from "@/utils/class-names";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchSubCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import requests from "@/utils/requests";
import { AxiosError } from "axios";
import { BaseResponse, Product } from "@/type/common";

const ProductForm = ({ product }: { product?: Product }) => {
  const queryClient = useQueryClient();
  const form = useProductFormContext(product);

  //   addProduct

  const mutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (data: z.infer<typeof productValidationSchema>) => {
      const { productCategory, ...dataWithOutProductCategory } = data;
      return requests.post(
        `/product/vendor/add-product`,
        dataWithOutProductCategory
      );
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: [`get-products`] });
    },

    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const mutationEdit = useMutation({
    mutationKey: ["editProduct"],
    mutationFn: (data: z.infer<typeof productValidationSchema>) => {
      const { productCategory, ...dataWithOutProductCategory } = data;
      return requests.patch(
        `/product/vendor/edit/edit-product/${product?._id}`,
        dataWithOutProductCategory
      );
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: [`get-products`] });
    },

    onError: (error: AxiosError<BaseResponse<any>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const onSubmit = (data: z.infer<typeof productValidationSchema>) => {
    console.log(data);

    if (data.images.length < 1) {
      toast.error("Please upload at least on image");

      return;
    }

    if (product) {
      mutationEdit.mutate(data);
    } else {
      mutation.mutate(data);
    }
  };

  const handleUploadSuccess = (url: string) => {
    toast.success("Image uploaded successfully");
    form.setValue("images", [...form.getValues("images"), url]); // Set the hidden image field with the uploaded image URL
  };

  const { data: productData, isLoading: isLoadingCat } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  // const handleRemoveImage = ()

  const handleRemoveImage = (img: string) => {
    const updatedImages = form
      .getValues("images")
      .filter((image) => image !== img);
    if (updatedImages.length > 1) {
      form.setValue("images", updatedImages);
    } else if (updatedImages.length === 1) {
      form.setValue("images", []);
    }
  };

  const images = form.watch("images");

  const category = form.watch("productCategory");

  const {
    isLoading,
    isError,
    data: subCates,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["product-sub-category", { category: category, page: 1 }],
    queryFn: fetchSubCategories,
  });

  console.log(images);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
        <div className="col-span-2">
          <div className="grid grid-cols-4  gap-4 mb-5">
            {images.map((img: string, index) => {
              return (
                <div
                  key={`${img}-${index}`}
                  className="bg-cover bg-center h-32 col-span-1 w-full rounded-lg relative"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <Button
                    className="bg-gray-100 h-7 w-7 p-1 rounded-full absolute top-1 right-1"
                    variant="ghost"
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                  >
                    <X size={15} />
                  </Button>
                </div>
              );
            })}
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="mb-8 mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
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

        <div className="mb-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-8">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="Weight" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productData?.data?.data &&
                      productData?.data?.data?.categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-8">
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isError ? (
                      <div>
                        Error: An error occurred while fetching categories.
                      </div>
                    ) : subCates?.data?.data?.categories &&
                      subCates.data.data.categories.length > 0 ? (
                      subCates.data.data.categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.title}
                        </SelectItem>
                      ))
                    ) : (
                      <div>No categories found.</div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8 hidden">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image URLs (comma-separated)"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={mutation.isPending || mutationEdit.isPending}
          className="col-span-2"
          type="submit"
        >
          {product
            ? mutationEdit.isPending
              ? "Editing Product..."
              : "Edit Product"
            : mutation.isPending
            ? "Adding Product..."
            : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

ProductForm.displayName = "ProductForm";

export default ProductForm;
