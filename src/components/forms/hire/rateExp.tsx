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
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogLoading } from "@/components/common/dialogLoading";
import Rating from "react-rating";

export const RateProSchema = z.object({
  comment: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  rate: z.coerce.number().min(1, {
    message: "Budget must be at least 1 naira.",
  }),
});

const RateProForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof RateProSchema>) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof RateProSchema>>({
    resolver: zodResolver(RateProSchema),
    defaultValues: {
      comment: "",
      rate: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-8">
                How satisfied are you with this product
              </FormLabel>
              <FormControl className="w-full">
                <Rating
                  className="!mt-4"
                  onChange={(value) => field.onChange(value)}
                  initialRating={field.value}
                  emptySymbol={
                    <div className="mr-4">
                      {" "}
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5564 2.72399C15.9646 -0.24263 20.0334 -0.242636 21.4416 2.72399L23.8753 7.85108C24.4345 9.02913 25.5155 9.84566 26.7659 10.0346L32.2079 10.8567C35.3567 11.3325 36.614 15.3557 34.3355 17.6649L30.3976 21.6558C29.4928 22.5728 29.0799 23.894 29.2935 25.1888L30.2231 30.824C30.761 34.0846 27.4693 36.5711 24.6529 35.0317L19.7855 32.3711C18.6671 31.7598 17.331 31.7598 16.2126 32.3711L11.3451 35.0317C8.52871 36.5711 5.23701 34.0846 5.7749 30.824L6.7045 25.1888C6.9181 23.894 6.50522 22.5728 5.60042 21.6558L1.66255 17.6649C-0.615961 15.3557 0.641348 11.3325 3.79018 10.8567L9.23218 10.0346C10.4826 9.84566 11.5635 9.02913 12.1227 7.85109L14.5564 2.72399Z"
                          fill="#DDDDDD"
                        />
                      </svg>
                    </div>
                  }
                  fullSymbol={
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5564 2.72399C15.9646 -0.24263 20.0334 -0.242636 21.4416 2.72399L23.8753 7.85108C24.4345 9.02913 25.5155 9.84566 26.7659 10.0346L32.2079 10.8567C35.3567 11.3325 36.614 15.3557 34.3355 17.6649L30.3976 21.6558C29.4928 22.5728 29.0799 23.894 29.2935 25.1888L30.2231 30.824C30.761 34.0846 27.4693 36.5711 24.6529 35.0317L19.7855 32.3711C18.6671 31.7598 17.331 31.7598 16.2126 32.3711L11.3451 35.0317C8.52871 36.5711 5.23701 34.0846 5.7749 30.824L6.7045 25.1888C6.9181 23.894 6.50522 22.5728 5.60042 21.6558L1.66255 17.6649C-0.615961 15.3557 0.641348 11.3325 3.79018 10.8567L9.23218 10.0346C10.4826 9.84566 11.5635 9.02913 12.1227 7.85109L14.5564 2.72399Z"
                        fill="#FEB100"
                        fill-opacity="0.75"
                      />
                    </svg>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-5">Describe your experience</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
};

export default RateProForm;
