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
  usePropertyFormContext,
  useAddProperty,
  useEditProperty,
  Property,
} from "./usePropertyForm";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertiesCategories } from "@/lib/requests/admin/categories/admin-category-request";

const PropertyForm = ({ property }: { property?: Property }) => {
  const form = usePropertyFormContext(property);
  const addPropertyMutation = useAddProperty();
  const editPropertyMutation = useEditProperty(property?._id ?? "");

  const { data: propertyData, isLoading: isLoadingCat } = useQuery({
    queryKey: ["property-category"],
    queryFn: () => fetchPropertiesCategories(),
  });

  const handleUploadSuccess = (url: string) => {
    toast.success("Image uploaded successfully");
    form.setValue("images", [...form.getValues("images"), url]);
  };

  const handleRemoveImage = (img: string) => {
    const updatedImages = form
      .getValues("images")
      .filter((image) => image !== img);
    form.setValue("images", updatedImages);
  };

  const images = form.watch("images");
  const amenities = form.watch("amenities");

  const onSubmit = (data: any) => {
    if (data.images.length < 1) {
      toast.error("Please upload at least one image");
      return;
    }

    if (property?._id) {
      editPropertyMutation?.mutate(data);
    } else {
      addPropertyMutation.mutate(data);
    }
  };

  const commonAmenities = [
    "Cable TV",
    "Serviced",
    "Bathtub",
    "P.O.P",
    "Swimming Pool",
    "Security",
    "Parking Space",
    "Air Conditioning",
    "24/7 Electricity",
    "Furnished",
    "Gym",
    "Elevator",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
        {/* Images Preview */}
        <div className="col-span-2">
          <div className="grid grid-cols-4 gap-4 mb-5">
            {images.map((img: string, index) => (
              <div
                key={`${img}-${index}`}
                className="bg-cover bg-center h-32 col-span-1 w-full rounded-lg relative"
                style={{ backgroundImage: `url(${img})` }}
              >
                <Button
                  className="bg-gray-100 h-7 w-7 p-1 rounded-full absolute top-1 right-1"
                  variant="ghost"
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                >
                  <X size={15} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="col-span-2 mb-8">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Title */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input placeholder="Property Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Property Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FormField
            control={form.control}
            name="location.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.country"
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

        <div className="mb-8">
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₦)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price in Naira"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <FormField
            control={form.control}
            name="details.bedroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number of Bedrooms"
                    type="number"
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
            name="details.bathroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number of Bathrooms"
                    type="number"
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
            name="details.toilet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toilets</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number of Toilets"
                    type="number"
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
            name="details.sittingRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sitting Rooms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number of Sitting Rooms"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amenities</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant={
                        field.value.includes(amenity) ? "default" : "outline"
                      }
                      onClick={() => {
                        const newValue = field.value.includes(amenity)
                          ? field.value.filter((a) => a !== amenity)
                          : [...field.value, amenity];
                        field.onChange(newValue);
                      }}
                      className="text-sm"
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyData?.data?.data &&
                      propertyData?.data?.data?.categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          disabled={
            addPropertyMutation.isPending ||
            (property?._id ? editPropertyMutation.isPending : false)
          }
          className="w-full"
          type="submit"
        >
          {property?._id
            ? editPropertyMutation?.isPending
              ? "Updating Property..."
              : "Update Property"
            : addPropertyMutation.isPending
            ? "Adding Property..."
            : "Add Property"}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
