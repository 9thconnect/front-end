"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword } from "@/lib/requests/vendor/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";

const WithdrawSchema = z.object({
  amount: z.number(),
});

export function WithdrawForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const user = useAppSelector((state) => state.auth.data as IVendor);

  async function onSubmit(data: z.infer<typeof WithdrawSchema>) {
    try {
      setIsLoading(true);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-offBlack">Bank details</h2>
        <div className="border rounded-lg px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="mr-7">Bank:</p>
            <p className="text-offBlack">{user.accountDetails.bankName}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="mr-7">Name:</p>
            <p className="text-offBlack">{user.accountDetails.accountName}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="mr-7">Account:</p>
            <p className="text-offBlack">{user.accountDetails.accountNumber}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="mr-7">Bank Code:</p>
            <p className="text-offBlack">{user.accountDetails.bankCode}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <Button disabled={isLoading} className="col-span-3" type="submit">
            {isLoading ? "Loading" : "Submit"}
          </Button>
          <AlertDialogCancel className="col-span-2 bg-transparent overflow-hidden border">
            Cancel
          </AlertDialogCancel>
        </div>
      </form>
    </Form>
  );
}
