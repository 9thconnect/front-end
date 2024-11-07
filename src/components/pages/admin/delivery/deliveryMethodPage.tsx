"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DeliveryMethod } from "@/type/common";
import { countryList } from "@/utils/common";

interface DeliveryResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    deliveries: DeliveryMethod[];
  };
}

const formSchema = z.object({
  country: z.string({
    required_error: "Please select a country.",
  }),
  deliveryMethod: z.enum(["Pick-up-station", "Door-delivery"], {
    required_error: "Please select a delivery method.",
  }),
  pricePerWeight: z
    .number({
      required_error: "Please enter price per weight.",
    })
    .min(0, "Price must be positive"),
  pricePerKilometer: z
    .number({
      required_error: "Please enter price per kilometer.",
    })
    .min(0, "Price must be positive"),
  timelineDurationFrom: z
    .number({
      required_error: "Please enter minimum duration.",
    })
    .min(0, "Duration must be positive"),
  timelineDurationTo: z
    .number({
      required_error: "Please enter maximum duration.",
    })
    .min(0, "Duration must be positive"),
});

const DELIVERY_METHODS = [
  { label: "Pick-up Station", value: "Pick-up-station" },
  { label: "Door Delivery", value: "Door-delivery" },
] as const;

const COUNTRIES = countryList;

const DeliveryMethodPage = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryMethod: "Door-delivery",
    },
  });

  const { data: deliveryMethods, isLoading } = useQuery({
    queryKey: ["deliveryMethods"],
    queryFn: () => requests.get<DeliveryResponse>("/delivery/all"),
  });

  const createDeliveryMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      requests.post<DeliveryResponse>("/delivery/create", data),
    onSuccess: () => {
      toast.success("Delivery method created successfully");
      handleReset();
      queryClient.invalidateQueries({ queryKey: ["deliveryMethods"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message, {
        description: "Failed to create delivery method",
      });
    },
  });

  const updateDeliveryMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: z.infer<typeof formSchema>;
    }) => requests.patch<DeliveryResponse>(`/delivery/edit/${id}`, data),
    onSuccess: () => {
      handleReset();
      queryClient.invalidateQueries({ queryKey: ["deliveryMethods"] });
      toast.success("Delivery method updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message, {
        description: "Failed to update delivery method",
      });
    },
  });

  const deleteDeliveryMutation = useMutation({
    mutationFn: (id: string) =>
      requests.delete<DeliveryResponse>(`/delivery/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveryMethods"] });
      toast.success("Delivery method deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete delivery method", {
        description: "Please try again",
      });
    },
  });

  const handleReset = () => {
    form.reset({
      deliveryMethod: "Door-delivery",
      country: "",
      pricePerWeight: 0,
      pricePerKilometer: 0,
      timelineDurationFrom: 0,
      timelineDurationTo: 0,
    });
    setEditingId(null);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const loadingToast = toast.loading(
      editingId ? "Updating delivery method..." : "Creating delivery method..."
    );
    if (editingId) {
      updateDeliveryMutation.mutate(
        { id: editingId, data },
        {
          onSettled: () => {
            toast.dismiss(loadingToast);
          },
        }
      );
    } else {
      createDeliveryMutation.mutate(data, {
        onSettled: () => {
          toast.dismiss(loadingToast);
        },
      });
    }
  };

  const handleEdit = (delivery: DeliveryMethod) => {
    setEditingId(delivery._id);
    form.reset({
      country: delivery.country,
      deliveryMethod: delivery.deliveryMethod,
      pricePerWeight: delivery.pricePerWeight,
      pricePerKilometer: delivery.pricePerKilometer,
      timelineDurationFrom: delivery.timelineDurationFrom,
      timelineDurationTo: delivery.timelineDurationTo,
    });
    toast.info("Editing delivery method");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Create"} Delivery Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a delivery method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DELIVERY_METHODS.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Weight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price per weight"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerKilometer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Kilometer</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price per kilometer"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timelineDurationFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration From</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter minimum duration"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timelineDurationTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration To</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter maximum duration"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={
                    createDeliveryMutation.isPending ||
                    updateDeliveryMutation.isPending
                  }
                >
                  {createDeliveryMutation.isPending ||
                  updateDeliveryMutation.isPending
                    ? "Saving..."
                    : editingId
                    ? "Update Delivery Method"
                    : "Create Delivery Method"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      handleReset();
                      toast.info("Cancelled editing");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Delivery Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveryMethods?.data?.data.deliveries.map(
              (delivery: DeliveryMethod) => (
                <Card key={delivery._id}>
                  <CardContent className="grid grid-cols-2 gap-2 p-4">
                    <div>
                      <strong>Country:</strong> {delivery.country}
                    </div>
                    <div>
                      <strong>Method:</strong> {delivery.deliveryMethod}
                    </div>
                    <div>
                      <strong>Price/Weight:</strong> {delivery.pricePerWeight}
                    </div>
                    <div>
                      <strong>Price/Km:</strong> {delivery.pricePerKilometer}
                    </div>
                    <div>
                      <strong>Duration:</strong> {delivery.timelineDurationFrom}{" "}
                      - {delivery.timelineDurationTo} minutes
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(delivery)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Delivery Method
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this delivery
                              method? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteDeliveryMutation.mutate(delivery._id)
                              }
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryMethodPage;
