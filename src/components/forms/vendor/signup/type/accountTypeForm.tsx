// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";

// export const selectAccountValidationSchema = z.object({
//   type: z.enum(["seller", "professional"], {
//     required_error: "You need to select a notification type.",
//   }),
// });

// type VendorSignupSelectTypeFormProps = {
//   onSubmit: (data: z.infer<typeof selectAccountValidationSchema>) => void;
//   formStateData: VendorSignUpRequest;
// };

// export function SelectAccountTypeForm({
//   onSubmit,
//   formStateData,
// }: VendorSignupSelectTypeFormProps) {
//   const form = useForm<z.infer<typeof selectAccountValidationSchema>>({
//     resolver: zodResolver(selectAccountValidationSchema),
//     defaultValues: {
//       type: formStateData.vendorType,
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem className="space-y-3">
//               <FormLabel>Notify me about...</FormLabel>
//               <FormControl>
//                 <RadioGroup
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   className="flex space-x-1"
//                 >
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl className="">
//                       <RadioGroupItem value="all" />
//                     </FormControl>
//                     <FormLabel className="font-normal">Seller</FormLabel>
//                   </FormItem>
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl>
//                       <RadioGroupItem value="mentions" />
//                     </FormControl>
//                     <FormLabel className="font-normal">Professional</FormLabel>
//                   </FormItem>
//                 </RadioGroup>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

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
import { User, Briefcase, BaggageClaimIcon, UserRoundPlus } from "lucide-react"; // Import icons from lucide-react

export const selectAccountValidationSchema = z.object({
  type: z.enum(["seller", "professional"], {
    required_error: "You need to select an account type.",
  }),
});

type VendorSignupSelectTypeFormProps = {
  onSubmit: (data: z.infer<typeof selectAccountValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
};

export function SelectAccountTypeForm({
  onSubmit,
  formStateData,
}: VendorSignupSelectTypeFormProps) {
  const form = useForm<z.infer<typeof selectAccountValidationSchema>>({
    resolver: zodResolver(selectAccountValidationSchema),
    defaultValues: {
      type: formStateData.vendorType,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-[#333333] mt-5"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Account Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  <div
                    className={`col-span-1 border p-3 rounded-md hover:bg-gray-100 cursor-pointer ${
                      field.value === "seller" ? "border-primary" : ""
                    }`}
                    onClick={() => field.onChange("seller")}
                  >
                    <div className="rounded-full inline-block p-3 bg-[#FFB5B5]">
                      <BaggageClaimIcon className="w-5 h-5 text-offBlack" />
                    </div>

                    <div className="font-normal mt-14 text-xl mb-2">
                      Sell on MCD
                    </div>
                    <p>Showcase products, and connect with customers.</p>
                  </div>

                  <div
                    className={`col-span-1 border p-3 rounded-md hover:bg-gray-100 cursor-pointer ${
                      field.value === "professional" ? "border-primary" : ""
                    }`}
                    onClick={() => field.onChange("professional")}
                  >
                    <div className="rounded-full inline-block p-3 bg-[#FFB5B5]">
                      <UserRoundPlus className="w-5 h-5 text-offBlack" />
                    </div>

                    <div className="font-normal mt-14 text-xl mb-2">
                      Become a Pro
                    </div>
                    <p>Join thousands trusted professionals, show expertise.</p>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 w-full" type="submit">
          Select Type
        </Button>
      </form>
    </Form>
  );
}
