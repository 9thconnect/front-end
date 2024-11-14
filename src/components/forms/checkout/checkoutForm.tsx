import React, { forwardRef, useEffect } from "react";
import { useCheckoutFormContext } from "./useCheckout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { checkoutValidationSchema } from "./checkoutValidator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CheckoutFormProps = {
  onSubmit: (data: z.infer<typeof checkoutValidationSchema>) => void;
  locationData: {
    country: string;
    state: string;
    city: string;
    address: string;
  };
};

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const CheckoutForm = forwardRef<HTMLFormElement, CheckoutFormProps>(
  (props, ref) => {
    const { onSubmit, locationData } = props;

    console.log("locationData", locationData);

    const form = useCheckoutFormContext(locationData);

    useEffect(() => {
      form.setValue("country", locationData.country);
      form.setValue("state", locationData.state);
      form.setValue("city", locationData.city);
      form.setValue("address", locationData.address);

      form.reset(locationData);
    }, [locationData, form]);

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-2 gap-5 py-5"
        >
          <div className="col-span-1 hidden">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1 hidden">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 hidden">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1 hidden">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="posterCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Poster Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button type="submit" style={{ display: "none" }}>
            Hidden Submit
          </button>
        </form>
      </Form>
    );
  }
);

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
