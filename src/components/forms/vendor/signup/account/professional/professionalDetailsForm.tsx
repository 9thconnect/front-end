"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/common/imageUpload";
import { siteConfig } from "@/config/site.config";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";

export const professionalDetailsValidationSchema = z.object({
  professionType: z.string().min(1, "Profession type is required"),
  professionName: z.string().min(1, "Profession name is required"),
  professionCity: z.string().min(1, "Profession city is required"),
  professionDesc: z.string().min(1, "Profession description is required"),
});

type ProfessionalDetailsFormProps = {
  onSubmit: (data: z.infer<typeof professionalDetailsValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
};

function useProfessionalDetailsForm(formStateData: VendorSignUpRequest) {
  return useForm<z.infer<typeof professionalDetailsValidationSchema>>({
    resolver: zodResolver(professionalDetailsValidationSchema),
    defaultValues: {
      professionType: formStateData.professionType,
      professionName: formStateData.professionName,
      professionCity: formStateData.professionCity,
      professionDesc: formStateData.professionDesc,
    },
  });
}

const ProfessionalDetailsForm = ({
  onSubmit,
  formStateData,
}: ProfessionalDetailsFormProps) => {
  const form = useProfessionalDetailsForm(formStateData);
  const [professionTypes, setProfessionTypes] = useState<
    { profession: string; _id: string }[]
  >([]);

  useEffect(() => {
    const fetchProfessionTypes = async () => {
      try {
        const response = await axios.get(
          `${siteConfig.apiURL}/category/profession/all`
        );
        setProfessionTypes(response.data.data.data.categories);
      } catch (error) {
        console.error("Failed to fetch profession types:", error);
      }
    };

    fetchProfessionTypes();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Profession Type */}
        <FormField
          control={form.control}
          name="professionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profession type" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionTypes.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profession Name */}
        <FormField
          control={form.control}
          name="professionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your profession name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profession City */}
        <FormField
          control={form.control}
          name="professionCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your profession city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profession Description */}
        <FormField
          control={form.control}
          name="professionDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a description for your profession"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfessionalDetailsForm;
