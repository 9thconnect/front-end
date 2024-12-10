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
import { RadioGroup } from "@/components/ui/radio-group";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
import { BaggageClaimIcon, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const selectSellerTypeValidationSchema = z.object({
  sellerType: z.enum(["wholeSale", "retail"], {
    required_error: "You need to select a seller type.",
  }),
});

type VendorSignupSelectSellerTypeFormProps = {
  onSubmit: (data: z.infer<typeof selectSellerTypeValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  setStage: React.Dispatch<React.SetStateAction<number>>;
};

export function SelectSellerTypeForm({
  onSubmit,
  formStateData,
  setStage,
}: VendorSignupSelectSellerTypeFormProps) {
  const form = useForm<z.infer<typeof selectSellerTypeValidationSchema>>({
    resolver: zodResolver(selectSellerTypeValidationSchema),
    defaultValues: {
      sellerType: formStateData.sellerType,
    },
  });

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage(4)}
      />
      <h2 className="my-5 text-2xl text-black">
        How would you like to sell on 9th?
      </h2>

      <Separator />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-[#333333] mt-5"
      >
        <FormField
          control={form.control}
          name="sellerType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  <div
                    className={`col-span-1 border p-3 rounded-md  cursor-pointer ${
                      field.value === "wholeSale" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => field.onChange("wholeSale")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "wholeSale"
                          ? "bg-red-950"
                          : "bg-[#FFB5B5]"
                      }`}
                    >
                      <BaggageClaimIcon
                        className={`w-5 h-5 ${
                          field.value === "wholeSale"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>

                    <div className="font-normal mt-14 text-xl mb-2">
                      Wholesale
                    </div>
                    <p>Sell products in bulk to businesses or resellers.</p>
                  </div>

                  <div
                    className={`col-span-1 border p-3 rounded-md  cursor-pointer ${
                      field.value === "retail" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => field.onChange("retail")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "retail" ? "bg-red-950" : "bg-[#FFB5B5]"
                      }`}
                    >
                      <BaggageClaimIcon
                        className={`w-5 h-5 ${
                          field.value === "retail"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>

                    <div className="font-normal mt-14 text-xl mb-2">Retail</div>
                    <p>Sell products directly to individual customers.</p>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-7 w-full py-5 " type="submit">
          Process
        </Button>
      </form>
    </Form>
  );
}
