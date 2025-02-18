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
export const ProposalSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  budget: z.coerce.number().min(1, {
    message: "Budget must be at least 1 naira.",
  }),
});
const SendProposalForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof ProposalSchema>) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProposalSchema>>({
    resolver: zodResolver(ProposalSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-7">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your proposal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total budget (₦)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter budget" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="startData"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-10">
              <FormLabel>Start Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
export default SendProposalForm;
