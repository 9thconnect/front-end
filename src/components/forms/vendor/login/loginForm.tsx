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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/requests/vendor/auth";
import { BaseResponse } from "@/type/common";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  storeAuthenticatedUser,
  UserType,
} from "@/lib/redux/features/auth/authSlice";
import { syncCartWithServer } from "@/lib/redux/features/cart/cartSlice";
import { REHYDRATE } from "redux-persist";
import Link from "next/link";
import requests from "@/utils/requests";
import { IAdmin, IVendor } from "@/type/users";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export function LoginForm({ type }: { type: UserType }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    try {
      setIsLoading(true);
      const res = await login(
        {
          email: data.email,
          password: data.password,
        },
        type
      );

      toast.success("Logged in successfully");

      if (res.data) {
        dispatch(
          storeAuthenticatedUser({
            type: type,
            data:
              type == UserType.ADMIN
                ? (res.data.admin as IAdmin)
                : (res.data.profile as IVendor),
            token: res.data.token,
          })
        );

        dispatch({ type: REHYDRATE });

        await new Promise((resolve) => setTimeout(resolve, 100));

        dispatch(syncCartWithServer());
      } else {
        if (type == UserType.ADMIN) {
          router.push(`/admin/confirm?email=${data.email}`);
          return;
        }
      }

      console.log(UserType.ADMIN, type, type == UserType.ADMIN);

      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }

      if (type == UserType.ADMIN) {
        router.push("/dashboard/home");
        return;
      }

      if (type == UserType.VENDOR) {
        router.push("/account/profile");
        return;
      }

      router.push("/marketplace");
    } catch (error: any) {
      toast.error(error.response?.data.message);
      if (error.response?.data.message == "Account not activated or verified") {
        try {
          let rsp = await requests.post(
            `${type}/auth/resend-verification-code/${data.email}`,
            {}
          );
          toast.error(rsp.message);

          router.push(`/${type}/verify?email=${data.email}`);
        } catch (error: any) {
          toast.error(error.response?.data.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-between items-center">
          <Link href={`/${type}/register`}>
            Don&apos;t have an account?{" "}
            <span className="text-black">Register</span>{" "}
          </Link>
          <Link className="text-black" href={`/${type}/password/request`}>
            Forget Password
          </Link>
        </div>
      </form>
    </Form>
  );
}
