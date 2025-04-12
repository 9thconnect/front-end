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
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import bankData from "@/data/bank.json";
import requests from "@/utils/requests";

import { updateVendor } from "@/lib/redux/features/auth/authSlice";
import BankAccountForm, {
  bankAccountDetailsValidationSchema,
} from "../account/bankAccountDetails";
import { useQueryClient } from "@tanstack/react-query";

const WithdrawSchema = z.object({
  amount: z.coerce.number().min(1000, {
    message: "Amount must be at least 1000.",
  }),
});

export function WithdrawForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const user = useAppSelector((state) => state.auth.data as IVendor);

  async function onSubmit(data: z.infer<typeof WithdrawSchema>) {
    try {
      setIsLoading(true);

      const res = await requests.patch(
        `payment/vendor-withdraw/${data.amount}`,
        {}
      );

      queryClient.invalidateQueries({
        queryKey: ["vendor-profile"],
      });

      toast.success(res.message);

      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleAccountDetailsSubmit = async (
    data: z.infer<typeof bankAccountDetailsValidationSchema>
  ) => {
    try {
      setIsLoading(true);
      const response = await requests.patch("/vendor/update-account-details", {
        bankCode: data.bank,
        accountNumber: data.accountNumber,
      });

      // Update Redux store with new account details
      dispatch(
        updateVendor({
          ...user,
          accountDetails: {
            bankName: bankData.find((bank) => bank.code === data.bank)
              ?.bank_name as string,
            bankCode: data.bank,
            accountNumber: data.accountNumber,
            accountName: data.accountName,
          },
        })
      );

      toast.success("Bank details updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to update bank details");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₦)</FormLabel>
                <FormControl>
                  <Input
                    disabled={!user?.accountDetails}
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-offBlack">Bank details</h2>
          {user?.accountDetails ? (
            <div className="border rounded-lg px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <p className="mr-7">Bank:</p>
                <p className="text-offBlack">
                  {user?.accountDetails?.bankName}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="mr-7">Name:</p>
                <p className="text-offBlack">
                  {user?.accountDetails?.accountName}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="mr-7">Account:</p>
                <p className="text-offBlack">
                  {user?.accountDetails?.accountNumber}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="mr-7">Bank Code:</p>
                <p className="text-offBlack">
                  {user?.accountDetails?.bankCode}
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg px-4 py-4">
              <p className="text-offBlack">
                Update your bank details to withdraw
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-3">
            {user?.accountDetails ? (
              <Button disabled={isLoading} className="col-span-3" type="submit">
                {isLoading ? "Loading" : "Submit"}
              </Button>
            ) : (
              <Button
                className="col-span-2"
                variant="destructive"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Update Bank Details
              </Button>
            )}

            <AlertDialogCancel className="col-span-2 bg-transparent overflow-hidden border">
              Cancel
            </AlertDialogCancel>
          </div>
        </form>
      </Form>

      {/* Modal for Account Details Form */}
      {/* <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Bank Details</AlertDialogTitle>
          </AlertDialogHeader>
          <BankAccountForm
            onSubmit={handleAccountDetailsSubmit}
            formStateData={{
              accountName: user?.accountDetails?.accountName || "",
              accountNumber: user?.accountDetails?.accountNumber || "",
              bankCode: user?.accountDetails?.bankCode || "",
            }}
          />
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog> */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Bank Details</AlertDialogTitle>
          </AlertDialogHeader>
          <BankAccountForm
            onSubmit={handleAccountDetailsSubmit}
            formStateData={{
              accountName: user?.accountDetails?.accountName || "",
              accountNumber: user?.accountDetails?.accountNumber || "",
              bankCode: user?.accountDetails?.bankCode || "",
            }}
            loading={isLoading}
          />
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
