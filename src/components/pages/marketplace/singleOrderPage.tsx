"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/redux/hooks";
import { getOrder } from "@/lib/requests/user/product";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  EllipsisIcon,
  EllipsisVertical,
  SquareMenuIcon,
  X,
} from "lucide-react";
import { HOCLoading } from "@/hoc/loadingHOC";
import requests from "@/utils/requests";
import { Textarea } from "@/components/ui/textarea";
import { OrderTracking } from "@/type/common";
import OrderTrackingInfo from "@/components/cards/orderTrackingCard";
import RateProductForm, {
  RateProSchema,
} from "@/components/forms/product/rateProduct";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { UserType } from "@/lib/redux/features/auth/authSlice";

const SingleOrderPage = ({ id }: { id: string }) => {
  const userType = useAppSelector((state) => state.auth.type);

  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const [actionType, setActionType] = useState<
    "complete" | "report" | "cancel" | "track" | "rate" | null
  >(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [serverMessage, setServerMessage] = useState({
    success: "",
    error: "",
  });

  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);

  const [rate, setRate] = useState(false);

  const completeOrderMutation = useMutation({
    mutationFn: () =>
      requests.patch<string>(`/order/customer/confirm-orders/${id}`, {}),
    onSuccess: (response) => {
      setLoading("success");
      setServerMessage({
        success: response.message || "Order completed successfully",
        error: "",
      });
      refetch();
    },
    onError: (error: any) => {
      setLoading("error");
      setServerMessage({
        success: "",
        error: error.response?.data?.message || "Failed to complete order",
      });
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: () =>
      requests.patch<string>(`/order/customer/cancel-order/${id}`, {}),
    onSuccess: (response) => {
      setLoading("success");
      setServerMessage({
        success: response.message || "Order cancelled successfully",
        error: "",
      });
      refetch();
    },
    onError: (error: any) => {
      setLoading("error");
      setServerMessage({
        success: "",
        error: error.response?.data?.message || "Failed to cancel order",
      });
    },
  });

  const trackOrderMutation = useMutation({
    mutationFn: () =>
      requests.get<OrderTracking>(
        `/order/customer/track-order/${data?.data?.orderID}`
      ),
    onSuccess: (response) => {
      setLoading("idle");
      setServerMessage({ success: "Order tracked successfully", error: "" });
      setTrackingData(response.data);
    },
    onError: (error: any) => {
      setLoading("error");
      setServerMessage({
        success: "",
        error: error.response?.data?.message || "Failed to track order",
      });
    },
  });

  const reportOrderMutation = useMutation({
    mutationFn: (reason: string) =>
      requests.patch<string>("/order/customer/report-order", {
        reason,
        orderId: id,
      }),
    onSuccess: (response) => {
      setLoading("success");
      setServerMessage({
        success: response.message || "Order reported successfully",
        error: "",
      });
      refetch();
    },
    onError: (error: any) => {
      console.log(error);

      setLoading("error");
      setServerMessage({
        success: "",
        error: error.response?.data?.message || "Failed to report order",
      });
    },
  });

  const confirmAction = () => {
    setLoading("loading");

    console.log("confirmAction", actionType);

    switch (actionType) {
      case "complete":
        completeOrderMutation.mutate();
        break;
      case "cancel":
        cancelOrderMutation.mutate();
        break;
      case "track":
        trackOrderMutation.mutate();
        break;
      case "report":
        reportOrderMutation.mutate(reportReason);
        break;
    }
  };

  const handleTrackOrder = () => {
    setLoading("loading");
    trackOrderMutation.mutate();
  };

  const handleAction = (
    action: "complete" | "report" | "cancel" | "track" | "rate"
  ) => {
    setActionType(action);

    if (action == "rate") {
      setActionType("complete");

      setRate(true);
      setLoading("idle");
      setIsDialogOpen(true);
      return;
    }
    setIsDialogOpen(true);

    if (action === "track") {
      handleTrackOrder();
    }
  };

  const resetState = () => {
    setLoading("idle");
    setActionType(null);
    setIsDialogOpen(false);
    setReportReason("");
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-order", { id: id, userType: userType }],
    queryFn: getOrder,
  });

  const onSubmitRating = useCallback(
    async (ratingData: z.infer<typeof RateProSchema>) => {
      setLoading("loading");
      try {
        if (data?.data?.orderItems) {
          await Promise.all(
            data.data.orderItems.map((item) =>
              requests.patch(
                `product/customer/rate-product/${item.productId._id}`,
                ratingData
              )
            )
          );
        }
        setLoading("success");

        toast.success("Rating submitted successfully");

        setIsDialogOpen(false);
        setRate(false);
      } catch (error) {
        setLoading("error");
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "An error occurred, try again"
          );
        } else {
          toast.error("An error occurred, try again");
        }
      } finally {
        setRate(false);
      }
    },
    [data] // Added dependency to ensure `data` is properly referenced
  );

  const handleShowRateForm = () => {
    setRate(true);
    setLoading("idle");
  };

  // Handle loading state
  if (isLoading || isFetching) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="border rounded-2xl p-2">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="hidden sm:block text-xl text-offBlack">Order Detail</h3>
        <div className="flex space-x-2 items-center">
          {userType == UserType.CUSTOMER && (
            <>
              <div className="flex space-x-2 items-center">
                <Button onClick={() => handleAction("complete")}>
                  Complete Order
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"outline"}>More</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleAction("report")}>
                      Report Order
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("cancel")}>
                      Cancel Order
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("track")}>
                      Track Order
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("rate")}>
                      Rate Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
                  <AlertDialogHeader className="flex flex-row items-center">
                    <AlertDialogCancel
                      className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3"
                      onClick={resetState}
                    >
                      <X size={15} />
                    </AlertDialogCancel>
                    <AlertDialogTitle>
                      {actionType === "report"
                        ? "Report Order"
                        : actionType === "complete" && rate
                        ? "Rate Order"
                        : `Confirm ${actionType} Order`}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <HOCLoading
                    status={loading}
                    successMessage={serverMessage.success}
                    successDescription="Your request has been processed successfully."
                    onSuccessButtonClick={
                      actionType === "complete"
                        ? handleShowRateForm
                        : resetState
                    }
                    successButtonText={
                      actionType === "complete" ? "Rate Experience" : "Okay"
                    }
                    // hideCancelButton={loading === "success" || actionType === "complete" && rate}
                    onClose={resetState}
                    cancelButtonText={
                      actionType === "complete" ? "Continue Shopping" : "Cancel"
                    }
                    errorMessage={serverMessage.error}
                    onErrorButtonClick={() => {
                      if (actionType) {
                        console.log("retry", actionType);
                        setLoading("loading"); // Set loading state
                        confirmAction(); // Call confirmAction directly
                      }
                    }}
                  >
                    {actionType === "report" ? (
                      <div>
                        <Textarea
                          className="w-full p-2 border rounded"
                          placeholder="Enter reason for reporting"
                          rows={4}
                          value={reportReason}
                          onChange={(e) => setReportReason(e.target.value)}
                        />

                        <div className="flex mt-12 w-full justify-center space-x-3">
                          <Button
                            onClick={confirmAction}
                            disabled={!reportReason.trim()}
                          >
                            Submit Report
                          </Button>
                          <Button variant={"outline"} onClick={resetState}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : actionType === "track" ? (
                      trackingData ? (
                        <OrderTrackingInfo trackingData={trackingData} />
                      ) : (
                        <p>Fetching tracking information...</p>
                      )
                    ) : actionType === "complete" ? (
                      rate ? (
                        <RateProductForm onSubmit={onSubmitRating} />
                      ) : (
                        <div className="text-center">
                          <p>
                            Are you sure you want to {actionType} this order?
                          </p>

                          <div className="flex mt-12 w-full justify-center space-x-3">
                            <Button onClick={confirmAction}>Confirm</Button>
                            <Button variant={"outline"} onClick={resetState}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-center">
                        <p>Are you sure you want to {actionType} this order?</p>

                        <div className="flex mt-12 w-full justify-center space-x-3">
                          <Button onClick={confirmAction}>Confirm</Button>
                          <Button variant={"outline"} onClick={resetState}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </HOCLoading>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm">
          Date place: {formatDate(new Date(data?.data?.dateOrdered as string))}
        </p>
        <p className="text-md text-offBlack">Order ID: {data?.data?.orderID}</p>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-0.5 py-2 border mt-2 rounded-lg">
          {data?.data?.orderItems.map((item) => (
            <a
              href={`/marketplace/${item.productId._id}`}
              target="_blank"
              key={`item-in-order-${item}`}
              className="flex p-2 py-4"
            >
              <div
                className="rounded-md mr-3 h-24 w-36 bg-cover bg-no-repeat bg-center "
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
              <div className=" flex flex-col space-y-4">
                <p className="text-xs">QTY: {item.quantity}</p>
                <p>{item.name}</p>
                <p className="text-lg text-offBlack">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Item Total Price</p>
            <p className="text-offBlack">
              {formatCurrency(
                data?.data?.orderDetails.itemsTotalPrice as number
              )}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Extra Price</p>
            <p className="text-offBlack">
              {formatCurrency(data?.data?.orderDetails.extraPrice as number)}
            </p>
          </div>

          <Separator orientation="horizontal" />
          <div className="flex justify-between items-center my-3">
            <p>Total Price</p>
            <p className="text-offBlack">
              {formatCurrency(data?.data?.orderDetails.totalPrice as number)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Invoice Reference</p>
            <p className="text-offBlack">{data?.data?.payment?.invoiceRef}</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Payer Name</p>
            <p className="text-offBlack">{data?.data?.payment?.payerName}</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Status</p>
            <p className="text-offBlack">{data?.data?.payment?.status}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Delivery Information</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center mt-3">
            <p>Address</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.address}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>City</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.city}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>State</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.state}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Postal Code</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.postalCode}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Country</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
