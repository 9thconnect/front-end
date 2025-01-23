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
// import { RadioGroup } from "@/components/ui/radio-group";
// import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
// import {
//   User,
//   Briefcase,
//   BaggageClaimIcon,
//   UserRoundPlus,
//   ArrowLeft,
// } from "lucide-react"; // Import icons from lucide-react
// import { Separator } from "@/components/ui/separator";

// export const selectAccountValidationSchema = z.object({
//   type: z.enum(["seller", "professional"], {
//     required_error: "You need to select an account type.",
//   }),
// });

// type VendorSignupSelectTypeFormProps = {
//   onSubmit: (data: z.infer<typeof selectAccountValidationSchema>) => void;
//   formStateData: VendorSignUpRequest;
//   setStage: React.Dispatch<React.SetStateAction<number>>;
// };

// export function SelectAccountTypeForm({
//   onSubmit,
//   formStateData,
//   setStage,
// }: VendorSignupSelectTypeFormProps) {
//   const form = useForm<z.infer<typeof selectAccountValidationSchema>>({
//     resolver: zodResolver(selectAccountValidationSchema),
//     defaultValues: {
//       type: formStateData.vendorType,
//     },
//   });

//   return (
//     <Form {...form}>
//       <ArrowLeft
//         className="text-black cursor-pointer"
//         onClick={() => setStage(3)}
//       />
//       <h2 className="my-5 text-2xl text-black">
//         {" "}
//         Please select your account type
//       </h2>

//       <Separator />

//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="text-[#333333] mt-5"
//       >
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem className="space-y-3">
//               <FormControl>
//                 <RadioGroup
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   className="grid grid-cols-2 gap-2"
//                 >
//                   <div
//                     className={`col-span-1 border p-3 rounded-md  cursor-pointer ${
//                       field.value === "seller" ? "bg-primary text-white" : ""
//                     }`}
//                     onClick={() => field.onChange("seller")}
//                   >
//                     <div
//                       className={`rounded-full inline-block p-3 ${
//                         field.value === "seller" ? "bg-red-950" : "bg-[#FFB5B5]"
//                       }`}
//                     >
//                       <BaggageClaimIcon
//                         className={`w-5 h-5 ${
//                           field.value === "seller"
//                             ? "text-white"
//                             : "text-offBlack"
//                         }  `}
//                       />
//                     </div>

//                     <div className="font-normal mt-14 text-xl mb-2">
//                       Sell on MCD
//                     </div>
//                     <p>Showcase products, and connect with customers.</p>
//                   </div>

//                   <div
//                     className={`col-span-1 border p-3 rounded-md  cursor-pointer ${
//                       field.value === "professional"
//                         ? "bg-primary text-white"
//                         : ""
//                     }`}
//                     onClick={() => field.onChange("professional")}
//                   >
//                     <div
//                       className={`rounded-full inline-block p-3 ${
//                         field.value === "professional"
//                           ? "bg-red-950"
//                           : "bg-[#FFB5B5]"
//                       }`}
//                     >
//                       <UserRoundPlus
//                         className={`w-5 h-5 ${
//                           field.value === "professional"
//                             ? "text-white"
//                             : "text-offBlack"
//                         }  `}
//                       />
//                     </div>

//                     <div className="font-normal mt-14 text-xl mb-2">
//                       Become a Pro
//                     </div>
//                     <p>Join thousands trusted professionals, show expertise.</p>
//                   </div>
//                 </RadioGroup>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button className="mt-7 w-full py-5 " type="submit">
//           Process
//         </Button>
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
import {
  User,
  Briefcase,
  BaggageClaimIcon,
  UserRoundPlus,
  ArrowLeft,
  Home,
  Truck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const selectAccountValidationSchema = z.object({
  type: z.enum(["seller", "professional", "real-estate", "logistic"], {
    required_error: "You need to select an account type.",
  }),
});

type VendorSignupSelectTypeFormProps = {
  onSubmit: (data: z.infer<typeof selectAccountValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  setStage: React.Dispatch<React.SetStateAction<number>>;
};

export function SelectAccountTypeForm({
  onSubmit,
  formStateData,
  setStage,
}: VendorSignupSelectTypeFormProps) {
  const form = useForm<z.infer<typeof selectAccountValidationSchema>>({
    resolver: zodResolver(selectAccountValidationSchema),
    defaultValues: {
      type: formStateData.vendorType,
    },
  });

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage(3)}
      />
      <h2 className="my-5 text-2xl text-black">
        Please select your account type
      </h2>

      <Separator />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-[#333333] mt-5"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  <div
                    className={`col-span-1 border p-3 rounded-md cursor-pointer ${
                      field.value === "seller" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => field.onChange("seller")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "seller" ? "bg-red-950" : "bg-[#FFB5B5]"
                      }`}
                    >
                      <BaggageClaimIcon
                        className={`w-5 h-5 ${
                          field.value === "seller"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>
                    <div className="font-normal mt-14 text-xl mb-2">
                      Sell on 9th
                    </div>
                    <p>Showcase products, and connect with customers.</p>
                  </div>

                  <div
                    className={`col-span-1 border p-3 rounded-md cursor-pointer ${
                      field.value === "professional"
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={() => field.onChange("professional")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "professional"
                          ? "bg-red-950"
                          : "bg-[#FFB5B5]"
                      }`}
                    >
                      <UserRoundPlus
                        className={`w-5 h-5 ${
                          field.value === "professional"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>
                    <div className="font-normal mt-14 text-xl mb-2">
                      Become a Pro
                    </div>
                    <p>Join thousands trusted professionals, show expertise.</p>
                  </div>

                  <div
                    className={`col-span-1 border p-3 rounded-md cursor-pointer ${
                      field.value === "real-estate"
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={() => field.onChange("real-estate")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "real-estate"
                          ? "bg-red-950"
                          : "bg-[#FFB5B5]"
                      }`}
                    >
                      <Home
                        className={`w-5 h-5 ${
                          field.value === "real-estate"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>
                    <div className="font-normal mt-14 text-xl mb-2">
                      Real Estate Agent
                    </div>
                    <p>List properties and connect with potential buyers.</p>
                  </div>

                  <div
                    className={`col-span-1 border p-3 rounded-md cursor-pointer ${
                      field.value === "logistic" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => field.onChange("logistic")}
                  >
                    <div
                      className={`rounded-full inline-block p-3 ${
                        field.value === "logistic"
                          ? "bg-red-950"
                          : "bg-[#FFB5B5]"
                      }`}
                    >
                      <Truck
                        className={`w-5 h-5 ${
                          field.value === "logistic"
                            ? "text-white"
                            : "text-offBlack"
                        }`}
                      />
                    </div>
                    <div className="font-normal mt-14 text-xl mb-2">
                      Logistics Provider
                    </div>
                    <p>Offer shipping and delivery services to businesses.</p>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-7 w-full py-5" type="submit">
          Proceed
        </Button>
      </form>
    </Form>
  );
}
