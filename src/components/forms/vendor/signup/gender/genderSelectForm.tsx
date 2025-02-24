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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VendorSignUpRequest } from "@/components/pages/vendor/buildProfilePage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const genderValidationSchema = z.object({
  gender: z.string({
    required_error: "Please select a gender",
  }),
});

type GenderFormProps = {
  onSubmit: (data: z.infer<typeof genderValidationSchema>) => void;
  formStateData: VendorSignUpRequest;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  previousStage: number;
};

const GenderSelectForm = ({
  onSubmit,
  formStateData,
  previousStage,
  setStage,
}: GenderFormProps) => {
  function useGenderForm() {
    return useForm<z.infer<typeof genderValidationSchema>>({
      resolver: zodResolver(genderValidationSchema),
      defaultValues: {
        gender: formStateData.gender,
      },
      mode: "onChange",
    });
  }
  const form = useGenderForm();

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage(previousStage)}
      />
      <h2 className="my-2 text-xl text-black">Create User Profile</h2>
      <p className="mb-4">
        We are excited to get you started as well. See you at the other side.
      </p>
      <Separator />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 py-5"
      >
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={formStateData.gender || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full col-span-2">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GenderSelectForm;
