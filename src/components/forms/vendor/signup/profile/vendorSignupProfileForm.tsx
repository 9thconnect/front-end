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
import { useVendorSignupProfileForm } from "./useVendorSignupProfileForm";
import { Button } from "@/components/ui/button";
import { vendorSignupProfileValidationSchema } from "./vendorSignupProfileValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
import Link from "next/link";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VendorSignupProfileFormProps = {
  onSubmit: (data: z.infer<typeof vendorSignupProfileValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  type: UserType;
  setStage: React.Dispatch<React.SetStateAction<number>>;
};

const VendorSignupProfileForm = ({
  onSubmit,
  formStateData,
  type,
  setStage,
}: VendorSignupProfileFormProps) => {
  const form = useVendorSignupProfileForm(formStateData);

  console.log("formStateData", formStateData);

  React.useEffect(() => {
    form.reset(formStateData);
  }, [formStateData, form]);

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage(1)}
      />
      <h2 className="my-2 text-xl text-black">Create User Profile</h2>
      <p className="mb-4">
        We are excited to get you started as well. See you at the other side.
      </p>
      <Separator />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 py-5"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
                  value={formStateData.gender || field.value}
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

        <div className="w-full col-span-2 flex justify-between items-center">
          <Link href={`/${type}/login`}>
            have an account? <span className="text-black">Login</span>{" "}
          </Link>
          <Link className="text-black" href={`/${type}/password/request`}>
            Forgot Password
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default VendorSignupProfileForm;
