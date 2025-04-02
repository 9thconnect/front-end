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
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserType } from "@/lib/redux/features/auth/authSlice";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({
  email,
  type,
}: {
  email: string;
  type: UserType;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else if (resendCooldown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const res = await verifyAccount(email, data.pin, type);

      toast.success(res.message);
      router.push(`/${type}/login`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOtp = async () => {
    if (isResendDisabled) return;

    try {
      const res = await resendVerificationCode(email, type);
      toast.success(res.message);
      setResendCooldown(30); // Start 30-second cooldown
      setIsResendDisabled(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    }
  };

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
                  Please enter the one-time password sent to your phone.
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

      <h2
        onClick={() => handleResendOtp()}
        className={`mt-10 text-center underline cursor-pointer ${
          isResendDisabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-green-700"
        }`}
      >
        {isResendDisabled ? `Resend Code (${resendCooldown}s)` : "Resend Code"}
      </h2>
    </div>
  );
}
