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
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, XIcon } from "lucide-react";

// Define the password validation schema
export const passwordValidationSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 10 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormProps = {
  onSubmit: (data: z.infer<typeof passwordValidationSchema>) => void;
  formStateData?: {
    password?: string;
    confirmPassword?: string;
  };
};

const PasswordForm = ({ onSubmit, formStateData }: PasswordFormProps) => {
  const form = useForm<z.infer<typeof passwordValidationSchema>>({
    resolver: zodResolver(passwordValidationSchema),
    defaultValues: {
      password: formStateData?.password || "",
      confirmPassword: formStateData?.confirmPassword || "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const password = watch("password");

  // Password requirements checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 6;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 gap-5 py-5"
      >
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-1">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full col-span-1 space-y-2">
          <div className="flex items-center">
            {isValidLength ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2">Minimum 10 characters</span>
          </div>
          <div className="flex items-center">
            {hasUpperCase ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2">At least one uppercase letter</span>
          </div>
          <div className="flex items-center">
            {hasLowerCase ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2">At least one lowercase letter</span>
          </div>
          <div className="flex items-center">
            {hasNumber ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2">At least one number</span>
          </div>
          <div className="flex items-center">
            {hasSpecialChar ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <XIcon className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2">At least one special character</span>
          </div>
        </div>

        <div className="w-full col-span-1">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;