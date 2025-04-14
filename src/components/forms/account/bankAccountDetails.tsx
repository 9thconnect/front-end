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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Assuming bankData is typed and imported
interface Bank {
  code: string;
  bank_name: string;
}

const bankData: Bank[] = require("@/data/bank.json"); // Adjust path as needed

export const bankAccountDetailsValidationSchema = z.object({
  bank: z.string({
    required_error: "Please select a bank",
  }),
  accountNumber: z
    .string()
    .min(10, "Account number must be exactly 10 digits")
    .max(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
  accountName: z.string({
    required_error: "Please enter your account name",
  }),
});

export type VendorSignUpRequest = {
  accountName?: string;
  accountNumber?: string;
  bankCode?: string;
};

type BankAccountFormProps = {
  onSubmit: (data: z.infer<typeof bankAccountDetailsValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  loading: boolean;
};

const BankAccountForm = ({
  onSubmit,
  formStateData,
  loading,
}: BankAccountFormProps) => {
  const form = useForm<z.infer<typeof bankAccountDetailsValidationSchema>>({
    resolver: zodResolver(bankAccountDetailsValidationSchema),
    defaultValues: {
      accountName: formStateData.accountName || "",
      accountNumber: formStateData.accountNumber || "",
      bank: formStateData.bankCode || "",
    },
    mode: "onChange",
  });

  console.log("loading", loading);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 py-5"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-64">
                    {bankData.map((bank) => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.bank_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    {...field}
                    placeholder="Enter your account number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your account name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full col-span-2">
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading.." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BankAccountForm;
