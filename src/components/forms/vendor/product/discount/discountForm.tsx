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
import { BaseResponse, Product } from "@/type/common";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  storeAuthenticatedUser,
  UserType,
} from "@/lib/redux/features/auth/authSlice";
import { syncCartWithServer } from "@/lib/redux/features/cart/cartSlice";
import { REHYDRATE } from "redux-persist";
import Link from "next/link";
import { updateDiscount } from "@/lib/requests/vendor/product";
import { useQueryClient } from "@tanstack/react-query";

const DiscountFormSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "Discount must be at least 1.",
  }),
});

export function DiscountForm({
  product,
  setDiscount,
}: {
  product: Product;
  setDiscount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<"deactivate" | "activate">("activate");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof DiscountFormSchema>>({
    resolver: zodResolver(DiscountFormSchema),
    defaultValues: {
      amount: product.discount.amount,
    },
  });

  async function onSubmit(data: z.infer<typeof DiscountFormSchema>) {
    try {
      setIsLoading(true);
      const res = await updateDiscount(product._id, action, data.amount);

      queryClient.invalidateQueries({ queryKey: [`get-products`] });

      toast.success(res.message);

      setDiscount(false);
    } catch (error: any) {
      toast.error(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter product discount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          onClick={() => setAction("activate")}
          disabled={isLoading}
          className="w-full"
          type="submit"
        >
          {isLoading ? "Update..." : "Update discount"}
        </Button>
        {product.discount.active && (
          <Button
            onClick={() => setAction("deactivate")}
            disabled={isLoading}
            className="w-full"
            type="submit"
          >
            {isLoading ? "Disabling..." : "Disable discount"}
          </Button>
        )}
      </form>
    </Form>
  );
}
