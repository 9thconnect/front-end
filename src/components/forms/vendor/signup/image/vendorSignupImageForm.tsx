"use client";

import React, { forwardRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/common/imageUpload";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";

export const vendorSignupImageValidationSchema = z.object({
  gender: z.string({
    required_error: "Please select a gender",
  }),
  image: z.string({
    required_error: "Please upload avatar",
  }),
});

type VendorSignupImageFormProps = {
  onSubmit: (data: z.infer<typeof vendorSignupImageValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
};

const VendorSignupImageForm = ({
  onSubmit,
  formStateData,
}: VendorSignupImageFormProps) => {
  function useVendorSignupImageForm() {
    return useForm<z.infer<typeof vendorSignupImageValidationSchema>>({
      resolver: zodResolver(vendorSignupImageValidationSchema),
      defaultValues: {
        image: formStateData.avatar,
        gender: formStateData.gender,
      },
    });
  }

  const form = useVendorSignupImageForm();

  const handleUploadSuccess = (url: string) => {
    form.setValue("image", url); // Set the hidden image field with the uploaded image URL
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 py-5"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="image"
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
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            uploadMethod="auto"
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full col-span-2">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VendorSignupImageForm;
