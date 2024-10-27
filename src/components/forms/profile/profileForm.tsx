"use client";

import React, { forwardRef, useState } from "react";
import { useProfileFormContext } from "./useProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { profileValidationSchema } from "./profileValidator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";
import { toast } from "sonner";
import axios from "axios";
import { updateProfile } from "@/lib/requests/vendor/profile";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AvatarUpload from "@/components/common/avatarUpload";

const ProfileForm = forwardRef<HTMLFormElement>((props) => {
  const vendor = useAppSelector((state) => state.auth.data) as IVendor;
  const type = useAppSelector((state) => state.auth.type);
  const [isLoading, setIsLoading] = useState(false);
  const form = useProfileFormContext(vendor);

  const onSubmit = async (data: z.infer<typeof profileValidationSchema>) => {
    try {
      setIsLoading(true);
      const resp = await updateProfile(
        {
          fullName: data.fullName,
          phoneNumber: data.phone,
          gender: data.gender,
        },
        type
      );

      toast.success(resp.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
        // Just a stock error
      }
    } finally {
      setIsLoading(false);
    }
  };

  const auth = useAppSelector((state) => state.auth);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 py-5"
      >
        <div className="col-span-2 flex justify-center mb-6">
          <AvatarUpload form={form} defaultAvatar={auth.data?.avatar} />
        </div>
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

        <div className="col-span-1">
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
        <div className="col-span-1">
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="posterCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Poster Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isLoading} className="col-span-2" type="submit">
          {isLoading ? "loading.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
});

ProfileForm.displayName = "ProfileForm";

export default ProfileForm;
