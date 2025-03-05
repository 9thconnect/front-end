"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheckBig, CircleOff } from "lucide-react";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CustomerAccountActionButtonProps {
  customerId: string;
  isSuspended: boolean;
}

const toggleCustomerAccountStatus = async (
  customerId: string,
  action: "suspend" | "activate",
  reason?: string
) => {
  try {
    await requests.patch(
      `/customer/suspend-unsuspend-account/${customerId}/${action}`,
      action === "suspend"
        ? {
            reasonForSuspension: reason || "Account suspended by administrator",
          }
        : {}
    );
  } catch (error) {
    console.error("Error toggling customer account status:", error);
    throw error;
  }
};

export const CustomerAccountActionButton: React.FC<
  CustomerAccountActionButtonProps
> = ({ customerId, isSuspended }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState("");
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: () =>
      toggleCustomerAccountStatus(
        customerId,
        isSuspended ? "activate" : "suspend",
        !isSuspended ? suspensionReason : undefined
      ),
    onSuccess: () => {
      toast.success(
        `Customer account ${
          isSuspended ? "activated" : "suspended"
        } successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["get-customers"] });
      setIsDialogOpen(false);
      setSuspensionReason(""); // Reset reason after successful action
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data.message ||
          "Failed to toggle customer account status"
      );
    },
  });

  const handleToggleStatus = () => {
    if (!isSuspended && !suspensionReason.trim()) {
      toast.error("Please provide a reason for suspension");
      return;
    }
    toggleStatusMutation.mutate();
  };

  return (
    <>
      <Button
        className="rounded-3xl"
        onClick={() => setIsDialogOpen(true)}
        variant={isSuspended ? "default" : "destructive"}
      >
        {isSuspended ? (
          <>
            Activate Account <CircleCheckBig className="ml-2" />
          </>
        ) : (
          <>
            Suspend Account <CircleOff className="ml-2" />
          </>
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSuspended ? "Activate Account" : "Suspend Account"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {isSuspended ? "activate" : "suspend"}{" "}
              this customer account?
            </DialogDescription>
          </DialogHeader>

          {!isSuspended && (
            <div className="py-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Reason for suspension (required)"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleToggleStatus}
              disabled={toggleStatusMutation.isPending}
              variant={isSuspended ? "default" : "destructive"}
            >
              {toggleStatusMutation.isPending
                ? "Processing..."
                : isSuspended
                ? "Activate"
                : "Suspend"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
