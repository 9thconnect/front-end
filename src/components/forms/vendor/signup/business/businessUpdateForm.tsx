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
import { countryList } from "@/utils/common";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";

export const businessDetailsValidationSchemaUpdate = z.object({
  businessType: z.string().optional(),
  businessDesc: z.string().min(1, "Business description is required"),
  shopName: z.string().min(1, "Shop name is required"),
  shopCountry: z.string().optional(),
  shopAddress: z.string().optional(),
  shopCity: z.string().optional(),
  shopState: z.string().optional(),
  businessLegalName: z.string().optional(),
  businessEmail: z.string().email("Invalid email address"),
  businessPhoneNumber: z
    .string()
    .min(11, {
      message: "phone must be at least 11 characters.",
    })
    .max(11, {
      message: "phone must be at most 11 characters.",
    }),
  businessRegNo: z.string().optional(),
  businessLogo: z.string().optional(),
});

type BusinessDetailsFormProps = {
  onSubmit: (
    data: z.infer<typeof businessDetailsValidationSchemaUpdate>
  ) => void;
  formStateData: VendorSignUpRequest;
  setStage?: React.Dispatch<React.SetStateAction<number>>;
};

const BusinessUpdateForm = ({
  onSubmit,
  formStateData,
  setStage,
}: BusinessDetailsFormProps) => {
  const vendor = useAppSelector((state) => state.auth.data as IVendor);

  console.log("vendor", vendor);

  function useBusinessDetailsForm() {
    return useForm<z.infer<typeof businessDetailsValidationSchemaUpdate>>({
      resolver: zodResolver(businessDetailsValidationSchemaUpdate),
      defaultValues: {
        businessDesc: formStateData.businessDesc,
        shopName: formStateData.shopName,
        shopCountry: formStateData.shopCountry,
        shopAddress: formStateData.shopAddress,
        shopState: formStateData.shopState,
        shopCity: formStateData.shopCity,
        businessLegalName: formStateData.businessLegalName,
        businessEmail: formStateData.businessEmail,
        businessPhoneNumber: formStateData.businessPhoneNumber,
        businessLogo: formStateData.businessLogo,
        businessRegNo: formStateData.businessRegNo,
      },
      mode: "onChange",
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
      <h2 className="my-2 text-xl text-black">Update Your Business</h2>

      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        {/* Business Type */}
        {/* <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={formStateData.businessType || field.value}
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
        /> */}

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
        {vendor.sellerType == "wholeSale" && (
          <FormField
            control={form.control}
            name="shopCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={formStateData.shopCountry || field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryList.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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

        {vendor.sellerType == "wholeSale" && (
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
        )}

        {vendor.sellerType == "wholeSale" && (
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
        )}

        {/* Business Legal Name */}
        <FormField
          control={form.control}
          name="businessLegalName"
          disabled
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
          disabled
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

export default BusinessUpdateForm;
