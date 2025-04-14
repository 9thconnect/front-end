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
import ImageUpload from "@/components/common/imageUpload";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFleetFormContext,
  useAddFleet,
  useEditFleet,
} from "./useLogisticForm";
import { Logistics } from "@/type/logistics";

interface LogisticType {
  id: number;
  logisticType: string;
  logisticSubtypes?: string[];
}

const FleetForm = ({
  fleet,
  setOpen,
}: {
  fleet?: Logistics;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useFleetFormContext(fleet);
  const addFleetMutation = useAddFleet();
  const editFleetMutation = useEditFleet(fleet?._id ?? "");

  const handleUploadSuccess = (url: string) => {
    toast.success("Image uploaded successfully");
    form.setValue("image", url);
  };

  const image = form.watch("image");

  const onSubmit = (data: any) => {
    if (!data.image) {
      toast.error("Please upload an image");
      return;
    }

    if (fleet?._id) {
      editFleetMutation?.mutate(data);
    } else {
      addFleetMutation.mutate({ data, form, setOpen });
    }
  };

  const logisticTypes = [
    {
      id: 1,
      logisticType: "road",
      logisticSubtypes: ["bike", "truck", "van", "LTL"],
    },
    {
      id: 2,
      logisticType: "rail",
      logisticSubtypes: ["internodalRail", "unitTrain"],
    },
    { id: 3, logisticType: "air", logisticSubtypes: ["cargoAirline"] },
    { id: 4, logisticType: "sea", logisticSubtypes: ["containerShip"] },
  ];

  const selectedType = form.watch("logisticType");
  const selectedTypeData = logisticTypes.find(
    (type) => type.logisticType === selectedType
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
        {/* Image Preview */}
        {image && (
          <div className="mb-5">
            <div
              className="bg-cover bg-center h-48 w-full rounded-lg relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <Button
                className="bg-gray-100 h-7 w-7 p-1 rounded-full absolute top-1 right-1"
                variant="ghost"
                type="button"
                onClick={() => form.setValue("image", "")}
              >
                <X size={15} />
              </Button>
            </div>
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-8">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Title */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fleet Title</FormLabel>
                <FormControl>
                  <Input placeholder="Fleet Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Registration */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Registration Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Details */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Fleet Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Logistic Type */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="logisticType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logistic Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {logisticTypes.map((type) => (
                      <SelectItem key={type.id} value={type.logisticType}>
                        {type.logisticType.charAt(0).toUpperCase() +
                          type.logisticType.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Logistic Sub Type */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="logisticSubType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logistic Sub Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={
                    !selectedType || !selectedTypeData?.logisticSubtypes
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedTypeData?.logisticSubtypes?.map((subType) => (
                      <SelectItem key={subType} value={subType}>
                        {subType.charAt(0).toUpperCase() + subType.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Capacity"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <Input placeholder="Fuel Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Rates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FormField
            control={form.control}
            name="ratePerKg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate per KG (₦)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rate per KG"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ratePerKilometer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate per Kilometer (₦)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rate per Kilometer"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          disabled={
            addFleetMutation.isPending ||
            (fleet?._id ? editFleetMutation.isPending : false)
          }
          className="w-full"
          type="submit"
        >
          {fleet?._id
            ? editFleetMutation?.isPending
              ? "Updating Fleet..."
              : "Update Fleet"
            : addFleetMutation.isPending
            ? "Adding Fleet..."
            : "Add Fleet"}
        </Button>
      </form>
    </Form>
  );
};

export default FleetForm;
