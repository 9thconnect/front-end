"use client";

import React, { forwardRef } from "react";
import { useChangePasswordFormContext } from "./useChangePassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { changePasswordValidationSchema } from "./changePasswordValidator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChangePasswordForm = forwardRef<HTMLFormElement>((props, ref) => {
  const form = useChangePasswordFormContext();

  const onSubmit = (data: z.infer<typeof changePasswordValidationSchema>) => {
    alert("Change Password Submitted");
  };

  return (
    <Form {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 gap-5 py-5"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Old Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="col-span-2" type="submit">
          Change Password
        </Button>
      </form>
    </Form>
  );
});

ChangePasswordForm.displayName = "ChangePasswordForm";

export default ChangePasswordForm;
