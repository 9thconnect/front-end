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
import bankData from "@/data/bank.json";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";

export const accountDetailsValidationSchema = z.object({
  bank: z.string({
    required_error: "Please select a bank",
  }),
  accountNumber: z.string({
    required_error: "Please enter your account number",
  }),
  accountName: z.string({
    required_error: "Please enter your account name",
  }),
});

type AccountDetailsFormProps = {
  onSubmit: (data: z.infer<typeof accountDetailsValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
};

const AccountDetailsForm = ({
  onSubmit,
  formStateData,
}: AccountDetailsFormProps) => {
  function useAccountDetailsForm() {
    return useForm<z.infer<typeof accountDetailsValidationSchema>>({
      resolver: zodResolver(accountDetailsValidationSchema),
      defaultValues: {
        accountName: formStateData.accountName,
        accountNumber: formStateData.accountNumber,
        bank: formStateData.bankCode,
      },
    });
  }
  const form = useAccountDetailsForm();

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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                  <Input {...field} placeholder="Enter your account number" />
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
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountDetailsForm;
