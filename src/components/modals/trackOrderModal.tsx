import { OrderTracking } from "@/type/common";
import React, { useEffect, useState } from "react";
import OrderTrackingInfo from "../cards/orderTrackingCard";
import { useMutation } from "@tanstack/react-query";
import requests from "@/utils/requests";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { HOCLoading } from "@/hoc/loadingHOC";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTrackModal } from "@/lib/redux/features/layout/layoutSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const TrackOrderModal = () => {
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);
  const [orderID, setOrderID] = useState<string>("");
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDialogOpen = useAppSelector(
    (state) => state.layout.showTrackingModal
  );

  const dispatch = useAppDispatch();

  const setIsDialogOpen = (open: boolean) => {
    if (!open) {
      setTrackingData(null);
      setLoading("idle");
      setOrderID("");
    }

    dispatch(
      toggleTrackModal({
        open: open,
      })
    );
  };

  const [serverMessage, setServerMessage] = useState({
    success: "",
    error: "",
  });
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const trackOrderMutation = useMutation({
    mutationFn: () =>
      requests.get<OrderTracking>(`/order/customer/track-order/${orderID}`),
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

  const resetState = () => {
    setLoading("idle");
    setIsDialogOpen(false);
    setOrderID("");
  };

  useEffect(() => {
    if (trackOrderMutation.isPending) {
      setLoading("loading");
    }
  }, [trackOrderMutation.isPending]);

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel
              className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3"
              onClick={resetState}
            >
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Track Order</AlertDialogTitle>
          </AlertDialogHeader>
          <HOCLoading
            status={loading}
            successMessage={serverMessage.success}
            successDescription="Your request has been processed successfully."
            onSuccessButtonClick={resetState}
            successButtonText={"Track Again"}
            // hideCancelButton={loading === "success" || actionType === "complete" && rate}
            onClose={resetState}
            cancelButtonText={"Cancel"}
            errorMessage={serverMessage.error}
            onErrorButtonClick={() => {
              trackOrderMutation.mutate();
            }}
          >
            {trackingData ? (
              <OrderTrackingInfo trackingData={trackingData} />
            ) : (
              <div className="flex items-center">
                <Input
                  value={orderID}
                  onChange={(e) => setOrderID(e.target.value)}
                  placeholder="order id"
                />
                <Button
                  onClick={() => trackOrderMutation.mutate()}
                  className="ml-3 px-7"
                  disabled={trackOrderMutation.isPending}
                >
                  Track Order
                </Button>
              </div>
            )}
          </HOCLoading>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TrackOrderModal;
