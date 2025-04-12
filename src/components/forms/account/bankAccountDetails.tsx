// "use client";

// import React, { useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandInput,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import bankData from "@/data/bank.json";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";

// export const bankAccountDetailsValidationSchema = z.object({
//   bank: z.string({
//     required_error: "Please select a bank",
//   }),
//   accountNumber: z
//     .string()
//     .min(10, "Account number must be exactly 10 digits")
//     .max(10, "Account number must be exactly 10 digits")
//     .regex(/^\d+$/, "Account number must contain only digits"),
//   accountName: z.string({
//     required_error: "Please enter your account name",
//   }),
// });

// export type VendorSignUpRequest = {
//   accountName?: string;
//   accountNumber?: string;
//   bankCode?: string;
// };

// type AccountDetailsFormProps = {
//   onSubmit: (data: z.infer<typeof bankAccountDetailsValidationSchema>) => void;
//   formStateData: VendorSignUpRequest;
// };

// const BankAccountForm = ({
//   onSubmit,
//   formStateData,
// }: AccountDetailsFormProps) => {
//   const [open, setOpen] = useState(false);

//   const form = useForm<z.infer<typeof bankAccountDetailsValidationSchema>>({
//     resolver: zodResolver(bankAccountDetailsValidationSchema),
//     defaultValues: {
//       accountName: formStateData.accountName || "",
//       accountNumber: formStateData.accountNumber || "",
//       bank: formStateData.bankCode || "",
//     },
//     mode: "onChange",
//   });

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full grid grid-cols-2 gap-5 py-5"
//       >
//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="bank"
//             render={({ field }) => (
//               <FormItem className="relative">
//                 <FormLabel>Bank</FormLabel>
//                 <Popover open={open} onOpenChange={setOpen}>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         className={cn(
//                           "w-full justify-between",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         {field.value
//                           ? bankData.find((bank) => bank.code === field.value)
//                               ?.bank_name
//                           : "Select a bank"}
//                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent
//                     className="w-[--radix-popover-trigger-width] p-0"
//                     align="start"
//                   >
//                     <Command className="relative">
//                       <CommandInput
//                         placeholder="Search banks..."
//                         className="h-9"
//                       />
//                       <CommandList>
//                         <CommandEmpty>No bank found.</CommandEmpty>
//                         <CommandGroup className="max-h-64 overflow-y-auto">
//                           {bankData.map((bank, index) => (
//                             <CommandItem
//                               key={`${bank.code} -- ${index}`}
//                               value={bank.bank_name}
//                               onSelect={() => {
//                                 form.setValue("bank", bank.code);
//                                 setOpen(false);
//                               }}
//                               className="cursor-pointer"
//                             >
//                               <Check
//                                 className={cn(
//                                   "mr-2 h-4 w-4",
//                                   field.value === bank.code
//                                     ? "opacity-100"
//                                     : "opacity-0"
//                                 )}
//                               />
//                               {bank.bank_name}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="accountNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Number</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     maxLength={10}
//                     {...field}
//                     placeholder="Enter your account number"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="accountName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter your account name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="w-full col-span-2">
//           <Button className="w-full" type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default BankAccountForm;

// "use client";

// import React, { useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandInput,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Assuming bankData is typed and imported
// interface Bank {
//   code: string;
//   bank_name: string;
// }

// const bankData: Bank[] = require("@/data/bank.json"); // Adjust path as needed

// export const bankAccountDetailsValidationSchema = z.object({
//   bank: z.string({
//     required_error: "Please select a bank",
//   }),
//   accountNumber: z
//     .string()
//     .min(10, "Account number must be exactly 10 digits")
//     .max(10, "Account number must be exactly 10 digits")
//     .regex(/^\d+$/, "Account number must contain only digits"),
//   accountName: z.string({
//     required_error: "Please enter your account name",
//   }),
// });

// export type VendorSignUpRequest = {
//   accountName?: string;
//   accountNumber?: string;
//   bankCode?: string;
// };

// type BankAccountFormProps = {
//   onSubmit: (data: z.infer<typeof bankAccountDetailsValidationSchema>) => void;
//   formStateData: VendorSignUpRequest;
// };

// const BankAccountForm = ({ onSubmit, formStateData }: BankAccountFormProps) => {
//   const [open, setOpen] = useState(false);

//   const form = useForm<z.infer<typeof bankAccountDetailsValidationSchema>>({
//     resolver: zodResolver(bankAccountDetailsValidationSchema),
//     defaultValues: {
//       accountName: formStateData.accountName || "",
//       accountNumber: formStateData.accountNumber || "",
//       bank: formStateData.bankCode || "",
//     },
//     mode: "onChange",
//   });

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full grid grid-cols-2 gap-5 py-5"
//       >
//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="bank"
//             render={({ field }) => (
//               <FormItem className="relative">
//                 <FormLabel>Bank</FormLabel>
//                 <Popover open={open} onOpenChange={setOpen}>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         aria-expanded={open}
//                         className={cn(
//                           "w-full justify-between",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         {field.value
//                           ? bankData.find((bank) => bank.code === field.value)
//                               ?.bank_name
//                           : "Select a bank"}
//                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent
//                     className="w-[--radix-popover-trigger-width] p-0"
//                     align="start"
//                     avoidCollisions={false}
//                   >
//                     <Command>
//                       <CommandInput
//                         placeholder="Search banks..."
//                         className="h-9"
//                       />
//                       <CommandList className="max-h-64 overflow-y-auto">
//                         <CommandEmpty>No bank found.</CommandEmpty>
//                         <CommandGroup>
//                           {bankData.map((bank) => (
//                             <CommandItem
//                               key={bank.code}
//                               value={bank.code}
//                               onSelect={() => {
//                                 form.setValue("bank", bank.code, {
//                                   shouldValidate: true,
//                                 });
//                                 setOpen(false);
//                               }}
//                               className="cursor-pointer"
//                             >
//                               <Check
//                                 className={cn(
//                                   "mr-2 h-4 w-4",
//                                   field.value === bank.code
//                                     ? "opacity-100"
//                                     : "opacity-0"
//                                 )}
//                               />
//                               {bank.bank_name}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="accountNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Number</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     maxLength={10}
//                     {...field}
//                     placeholder="Enter your account number"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="col-span-2">
//           <FormField
//             control={form.control}
//             name="accountName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter your account name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="w-full col-span-2">
//           <Button className="w-full" type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default BankAccountForm;

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

// Assuming bankData is typed and imported
interface Bank {
  code: string;
  bank_name: string;
}

const bankData: Bank[] = require("@/data/bank.json"); // Adjust path as needed

export const bankAccountDetailsValidationSchema = z.object({
  bank: z.string({
    required_error: "Please select a bank",
  }),
  accountNumber: z
    .string()
    .min(10, "Account number must be exactly 10 digits")
    .max(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
  accountName: z.string({
    required_error: "Please enter your account name",
  }),
});

export type VendorSignUpRequest = {
  accountName?: string;
  accountNumber?: string;
  bankCode?: string;
};

type BankAccountFormProps = {
  onSubmit: (data: z.infer<typeof bankAccountDetailsValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  loading: boolean;
};

const BankAccountForm = ({
  onSubmit,
  formStateData,
  loading,
}: BankAccountFormProps) => {
  const form = useForm<z.infer<typeof bankAccountDetailsValidationSchema>>({
    resolver: zodResolver(bankAccountDetailsValidationSchema),
    defaultValues: {
      accountName: formStateData.accountName || "",
      accountNumber: formStateData.accountNumber || "",
      bank: formStateData.bankCode || "",
    },
    mode: "onChange",
  });

  console.log("loading", loading);

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
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-64">
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
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    {...field}
                    placeholder="Enter your account number"
                  />
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
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading.." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BankAccountForm;
