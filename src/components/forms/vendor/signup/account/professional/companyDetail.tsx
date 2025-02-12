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
import ImageUpload from "@/components/common/imageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site.config";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
import { Textarea } from "@/components/ui/textarea";
import { fetchBusinessCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { Category } from "@/type/category";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const professionalCompanyDetailsValidationSchema = z.object({
  businessType: z.string().min(1, "Business type is required"),
  businessDesc: z.string().min(1, "Business description is required"),
  shopName: z.string().min(1, "Shop name is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  shopCity: z.string().min(1, "Shop city is required"),
  shopState: z.string().min(1, "Shop state is required"),
  businessLegalName: z.string().min(1, "Business legal name is required"),
  businessEmail: z.string().email("Invalid email address"),
  businessPhoneNumber: z.string().min(1, "Phone number is required"),
  businessRegNo: z.string().min(1, "Business registration number is required"),
  businessLogo: z.string().min(1, "Business logo is required"),
});

type BusinessDetailsFormProps = {
  onSubmit: (
    data: z.infer<typeof professionalCompanyDetailsValidationSchema>
  ) => void;
  formStateData: VendorSignUpRequest;
  setStage?: React.Dispatch<React.SetStateAction<number>>;
};

const ProfessionalCompanyDetailsForm = ({
  onSubmit,
  formStateData,
  setStage,
}: BusinessDetailsFormProps) => {
  function useBusinessDetailsForm() {
    return useForm<z.infer<typeof professionalCompanyDetailsValidationSchema>>({
      resolver: zodResolver(professionalCompanyDetailsValidationSchema),
      defaultValues: {
        businessDesc: formStateData.businessDesc,
        shopName: formStateData.shopName,
        shopAddress: formStateData.shopAddress,
        shopCity: formStateData.shopCity,
        shopState: formStateData.shopState,
        businessLegalName: formStateData.businessLegalName,
        businessEmail: formStateData.businessEmail,
        businessPhoneNumber: formStateData.businessPhoneNumber,
        businessRegNo: formStateData.businessRegNo,
        businessLogo: formStateData.businessLegalName,
      },
    });
  }

  const form = useBusinessDetailsForm();

  const [bankCodes, setBankCodes] = useState<
    { bank_name: string; code: string }[]
  >([]);

  const [getBusinessTypes, setGetBusinessTypes] = useState(false);

  const { data: businessData, isFetching } = useQuery({
    queryKey: ["business-category"],
    queryFn: () => fetchBusinessCategories(),
    enabled: !!getBusinessTypes,
  });

  const handleUploadSuccess = (url: string) => {
    form.setValue("businessLogo", url); // Set the hidden image field with the uploaded image URL
  };

  return (
    <Form {...form}>
      <h2 className="my-2 text-xl text-black">Company details</h2>
      <p className="mb-4">Give us your company details</p>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        {/* Business Type */}
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onOpenChange={() => setGetBusinessTypes(true)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {isFetching
                      ? "Loading.."
                      : businessData?.data?.data?.categories &&
                        businessData?.data?.data.categories.map((type) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.title}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Description */}
        <FormField
          control={form.control}
          name="businessDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your business description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shop Name */}
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shop name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shop Address */}
        <FormField
          control={form.control}
          name="shopAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shop address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shop City */}
        <FormField
          control={form.control}
          name="shopCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shop city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop State</FormLabel>
              <FormControl>
                <Input placeholder="Enter your shop state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Legal Name */}
        <FormField
          control={form.control}
          name="businessLegalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Legal Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your business legal name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Email */}
        <FormField
          control={form.control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Phone Number */}
        <FormField
          control={form.control}
          name="businessPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your business phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Registration Number */}
        <FormField
          control={form.control}
          name="businessRegNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Registration Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your business registration number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Logo */}
        <FormField
          control={form.control}
          name="businessLogo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormLabel>Business Logo</FormLabel>
              <ImageUpload onUploadSuccess={handleUploadSuccess} />
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

export default ProfessionalCompanyDetailsForm;
