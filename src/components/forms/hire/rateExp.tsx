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
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your experience</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose your rating</FormLabel>
              <FormControl>
                <Rating
                  onChange={field.onChange}
                  start={0}
                  stop={5}
                  step={field.value}
                />
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
