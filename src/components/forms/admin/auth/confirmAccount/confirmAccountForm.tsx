"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  resendVerificationCode,
  verifyAccount,
} from "@/lib/requests/vendor/auth";
import { toast } from "sonner";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BaseResponse } from "@/type/common";
import { useRouter } from "next/navigation";
import {
  storeAuthenticatedUser,
  UserType,
} from "@/lib/redux/features/auth/authSlice";
import Link from "next/link";
import requests from "@/utils/requests";
import { IAdmin } from "@/type/users";
import { useAppDispatch } from "@/lib/redux/hooks";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function ConfirmAccountForm({ email }: { email: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const res = await requests.post<{
        token: string;
        admin: IAdmin;
      }>(`admin/auth/verify-login/${email}/${data.pin}`, {});
      //   const res = await verifyAccount(email, data.pin, type);

      if (res.data)
        dispatch(
          storeAuthenticatedUser({
            type: UserType.ADMIN,
            data: res.data?.admin,
            token: res.data?.token as string,
          })
        );

      toast.success(res.message);
      router.push(`/dashboard/home`);
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
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} className="w-full mt-8" type="submit">
            {isLoading ? "Verifying" : "Verify"} Your Account
          </Button>
        </form>
      </Form>

      <Link
        href={"/admin/login"}
        className="mt-10 block  text-center underline"
      >
        Back to Login
      </Link>
    </div>
  );
}
