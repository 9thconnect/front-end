"use client";
import React, { useRef, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import requests from "@/utils/requests";
import { checkoutValidationSchema } from "@/components/forms/checkout/checkoutValidator";
import { orderProduct } from "@/lib/requests/user/product";
import axios from "axios";
import CheckoutForm from "@/components/forms/checkout/checkoutForm";
import { countryList } from "@/utils/common";
import { Textarea } from "@/components/ui/textarea";

// Types
interface DeliveryMethod {
  _id: string;
  deliveryMethod: string;
  price: number;
  timeline: string;
}

const locationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "City is required"),
  posterCode: z.string().min(1, "Post Code is required"),
});

type LocationFormData = z.infer<typeof locationSchema>;

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMethods, setLoadingMethods] = useState(false);
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod | null>(
    null
  );
  const [showDeliveryMethods, setShowDeliveryMethods] = useState(false);
  const [locationData, setLocationData] = useState<{
    country: string;
    state: string;
    city: string;
    address: string;
  }>({
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const fetchDeliveryMethods = async (data: LocationFormData) => {
    setLoadingMethods(true);
    setLocationData(data);
    try {
      const response = await requests.get<DeliveryMethod[]>(
        `/delivery/delivery-methods/${data.country}/${data.state}/${
          data.city
        }/${encodeURIComponent(data.address)}`
      );

      if (response.data) {
        setDeliveryMethods(response.data);
        setShowDeliveryMethods(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to fetch delivery methods");
      }
    } finally {
      setLoadingMethods(false);
    }
  };

  const handlePlaceOrder = async (data: LocationFormData) => {
    try {
      setLoading(true);

      let response;
      if (
        selectedMethod &&
        selectedMethod.deliveryMethod &&
        selectedMethod.price
      )
        response = await orderProduct({
          deliveryMethod: selectedMethod._id,
          deliveryPrice: selectedMethod.price,
          shippingAddress: {
            address: data.address,
            city: data.city,
            state: data.state,
            postalCode: data.posterCode,
            country: data.country,
          },
          redirectURL:
            `${process.env.NEXT_PUBLIC_BASE_URL}/marketplace/payment/confirm` as string,
        });

      toast.success(response?.message);

      if (response?.data?.checkout) {
        window.location.href = response.data?.checkout;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = selectedMethod?.price || 0;
  const total = subtotal + deliveryFee;

  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
  });

  return (
    <div className="mt-5">
      <div className="block md:grid md:grid-cols-8 md:gap-8">
        <div className="md:col-span-5">
          {/* Location Selection */}
          <div className="mb-8">
            <h3 className="text-2xl text-offBlack mb-4">Delivery Location</h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(fetchDeliveryMethods)}
                className="space-y-6"
              >
                {/* Country Select */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryList.map((country) => (
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

                {/* State Input */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Enter your state"
                          className="mt-1 p-2 border rounded w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City Input */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Enter your city"
                          className="mt-1 p-2 border rounded w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Enter your address"
                          className="mt-1 p-2 border rounded w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="posterCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Code</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Enter your Post Code"
                          className="mt-1 p-2 border rounded w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loadingMethods}
                >
                  {loadingMethods ? "Loading..." : "Get Delivery Methods"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Delivery Methods */}
          {showDeliveryMethods && (
            <div className="mb-8">
              <h3 className="text-2xl text-offBlack mb-4">
                Select Delivery Method
              </h3>
              {loadingMethods ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <RadioGroup
                  className="space-y-4"
                  value={selectedMethod?._id}
                  onValueChange={(value) => {
                    const method = deliveryMethods.find(
                      (method) => method._id === value
                    );
                    if (method) {
                      setSelectedMethod(method);
                    }
                  }}
                >
                  {deliveryMethods.map((method) => (
                    <div
                      key={method._id}
                      className="flex items-center space-x-4 border p-4 rounded-lg"
                    >
                      <RadioGroupItem value={method._id} id={method._id} />
                      <Label htmlFor={method._id} className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {method.deliveryMethod}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.timeline}
                            </p>
                          </div>
                          <p className="font-medium">
                            ₦{method.price.toLocaleString()}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}

          {/* Shipping Details Form - Blurred until delivery method is selected */}
          {/* <div
            className={`transition-all duration-300 ${
              !selectedMethod
                ? "opacity-50 pointer-events-none filter blur-sm"
                : ""
            }`}
          >
            <div className="section-card-header mb-5">
              <h3 className="text-2xl text-offBlack">
                Additional Delivery Details
              </h3>
              <p className="text-sm mt-3">
                Please provide additional details for your delivery.
              </p>
              <div className="border-b-2 w-full mt-4"></div>
            </div>
            <CheckoutForm
              onSubmit={onSubmit}
              ref={formRef}
              locationData={locationData}
            />
          </div> */}
        </div>

        {/* Order Summary - Blurred until delivery method is selected */}
        <div
          className={`md:self-start md:sticky md:col-span-3 md:top-56 transition-all duration-300 
          ${!selectedMethod ? "opacity-50 filter blur-sm" : ""}`}
        >
          <h2 className="my-3 text-2xl text-offBlack">Order Summary</h2>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <p>Subtotal</p>
              <p className="text-offBlack">₦ {subtotal.toLocaleString()}</p>
            </div>
            {selectedMethod && (
              <div className="flex justify-between items-center">
                <div>
                  <p>Delivery Fee</p>
                  <p className="text-sm text-gray-500">
                    {selectedMethod.deliveryMethod}
                  </p>
                </div>
                <p>₦ {deliveryFee.toLocaleString()}</p>
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <p>Total</p>
              <p>₦ {total.toLocaleString()}</p>
            </div>
          </div>
          <Button
            disabled={!selectedMethod || subtotal < 1 || loading}
            onClick={form.handleSubmit(handlePlaceOrder)}
            className="w-full mt-5 rounded-lg"
          >
            {loading
              ? "Loading..."
              : `Make payment ₦ ${total.toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
