"use client";

import React, { useState } from "react";
import { columns, renderStatus } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ReceiptText, X } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Proposal } from "@/type/professional";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsAdmin } from "@/lib/requests/admin/products";
import {
  acceptOffer,
  getProposals,
  rejectOffer,
} from "@/lib/requests/vendor/bidding";
import FilterSelect from "@/components/common/filterSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";

const ProposalTable = () => {
  const [rowData, setRowData] = useState<Proposal | undefined>();
  const [open, setOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customDeliveryDays, setCustomDeliveryDays] = useState("");

  const handleRowClick = (e: Proposal) => {
    setRowData(e);
    setOpen(true);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => getProposals(),
  });

  const queryClient = useQueryClient();

  const acceptOfferMutation = useMutation({
    mutationFn: (payload: {
      offerId: string;
      addCustomExpectedDelivery?: boolean;
      customExpectDeliver?: number;
    }) => acceptOffer(payload),
    onSuccess: () => {
      toast("Offer Accepted", {
        description: "The offer has been successfully accepted.",
      });
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      setOpen(false);
      setIsAcceptDialogOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });

  // Reject Offer Mutation (remains the same)
  const rejectOfferMutation = useMutation({
    mutationFn: (payload: { offerId: string; rejectedReason: string }) =>
      rejectOffer(payload),
    onSuccess: () => {
      toast("Offer Rejected", {
        description: "The offer has been successfully rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      setOpen(false);
      setIsRejectDialogOpen(false);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });

  console.log(data?.data?.data.offers);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
    }
  };

  function onClose() {
    setOpen(false);
  }

  const openRejectDialog = () => {
    setIsRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setIsRejectDialogOpen(false);
    setRejectionReason("");
  };

  const openAcceptDialog = () => {
    setIsAcceptDialogOpen(true);
  };

  const closeAcceptDialog = () => {
    setIsAcceptDialogOpen(false);
    setCustomDeliveryDays("");
  };

  const handleAcceptOffer = () => {
    if (!rowData) return;

    const payload = customDeliveryDays
      ? {
          offerId: rowData._id,
          addCustomExpectedDelivery: true,
          customExpectDeliver: parseInt(customDeliveryDays),
        }
      : {
          offerId: rowData._id,
          addCustomExpectedDelivery: false,
        };

    acceptOfferMutation.mutate(payload);
  };

  const handleRejectOffer = () => {
    if (!rowData || !rejectionReason) return;

    rejectOfferMutation.mutate({
      offerId: rowData._id,
      rejectedReason: rejectionReason,
    });
  };

  return (
    <div>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        dismissible
        onClose={onClose}
        direction="right"
      >
        <DrawerContent className="max-w-[425px] h-full ml-auto border flex flex-col">
          <DrawerHeader className="sticky top-0 bg-white z-10 pb-2">
            <div className="flex items-center">
              <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                <X size={20} />
              </DrawerClose>
              <DrawerTitle className="font-thin text-offBlack">
                Offer
              </DrawerTitle>
            </div>

            {rowData && rowData?.expired ? (
              <p>Proposal expired</p>
            ) : (
              rowData?.status == "pending" && (
                <div className="flex w-full space-x-4 mt-3">
                  <Button
                    className="w-full"
                    onClick={() => {
                      openAcceptDialog();
                    }}
                    disabled={acceptOfferMutation.isPending}
                  >
                    {acceptOfferMutation.isPending ? "Accepting..." : "Accept"}
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={openRejectDialog}
                    disabled={rejectOfferMutation.isPending}
                  >
                    {rejectOfferMutation.isPending ? "Rejecting..." : "Reject"}
                  </Button>
                </div>
              )
            )}
          </DrawerHeader>

          {rowData && (
            <div className="flex-grow overflow-y-auto px-3 mt-4 pt-10 pb-20">
              <div className="p-4 rounded-lg mb-10 relative border text-center">
                <div className="p-2 rounded-full bg-primary/20 flex justify-center items-center absolute -top-5 right-1/2">
                  <ReceiptText size={15} className="text-primary" />
                </div>
                <div className="mt-3">
                  <p>
                    {new Date(rowData.offeredDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <p className="text-3xl font-bold text-offBlack my-3">
                    {formatCurrency(rowData.proposedPrice)}
                  </p>
                  {renderStatus(rowData.status)}
                </div>
              </div>
              <div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Customer</p>
                  <div className="flex flex-col items-end space-x-2">
                    <img
                      src={rowData.customer.avatar}
                      alt={`${rowData.customer.fullName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{rowData.customer.fullName}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Professional</p>
                  <div className="flex flex-col items-end space-x-2">
                    <img
                      src={rowData.professional.avatar}
                      alt={`${rowData.professional.fullName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{rowData.professional.fullName}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Profession</p>
                  <p>{rowData.profession.professionName}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Project Description</p>
                  <p className="truncate max-w-[200px]">
                    {rowData.projectDescription}
                  </p>
                </div>
                {rowData.expectedDelivery && (
                  <div className="border-b pb-5 mt-3 flex justify-between items-center">
                    <p>Expected Delivery</p>
                    <p>{rowData.expectedDelivery} days</p>
                  </div>
                )}

                {rowData.rejectedReason && (
                  <div className="border-b pb-5 mt-3 flex justify-between items-center">
                    <p>Rejection Reason</p>
                    <p>{rowData.rejectedReason}</p>
                  </div>
                )}
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Status</p>
                  <p>{rowData.status}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Paid Status</p>
                  <p>{rowData.isPaid ? "Paid" : "Unpaid"}</p>
                </div>
              </div>
            </div>
          )}

          <DrawerFooter className="sticky bottom-0 bg-white z-10 py-4 border-t">
            {rowData?.expired ? (
              <p>Proposal expired</p>
            ) : (
              rowData?.status == "pending" && (
                <div className="flex w-full space-x-4 mt-3">
                  <Button
                    className="w-full"
                    onClick={() => {
                      openAcceptDialog();
                    }}
                    disabled={acceptOfferMutation.isPending}
                  >
                    {acceptOfferMutation.isPending ? "Accepting..." : "Accept"}
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={openRejectDialog}
                    disabled={rejectOfferMutation.isPending}
                  >
                    {rejectOfferMutation.isPending ? "Rejecting..." : "Reject"}
                  </Button>
                </div>
              )
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Dialog open={isAcceptDialogOpen} onOpenChange={closeAcceptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Offer</DialogTitle>
            <DialogDescription>
              Would you like to set a custom delivery timeline?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              type="number"
              placeholder="Custom delivery days (optional)"
              value={customDeliveryDays}
              onChange={(e) => setCustomDeliveryDays(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Current expected delivery:{" "}
              {rowData && !rowData.expectedDelivery
                ? "Not Set"
                : `${rowData?.expectedDelivery} days`}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeAcceptDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleAcceptOffer}
              disabled={acceptOfferMutation.isPending}
            >
              {acceptOfferMutation.isPending
                ? "Accepting..."
                : customDeliveryDays
                ? "Accept with Custom Delivery"
                : "Accept Offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Offer Dialog (previous implementation) */}
      <Dialog open={isRejectDialogOpen} onOpenChange={closeRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Offer</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting the offer
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Enter rejection reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeRejectDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleRejectOffer}
              disabled={!rejectionReason || rejectOfferMutation.isPending}
            >
              {rejectOfferMutation.isPending ? "Rejecting..." : "Reject Offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="space-y-4">
          {/* Repeat this block for the number of rows you want to display as loading */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-2 px-4">
              {/* Table columns loader */}
              <Skeleton className="h-6 w-full" /> {/* First Column */}
              <Skeleton className="h-6 w-full" /> {/* First Column */}
              <Skeleton className="h-6 w-full" /> {/* First Column */}
              <Skeleton className="h-6 w-full" /> {/* First Column */}
              <Skeleton className="h-6 w-full" /> {/* First Column */}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="border rounded-t-xl py-8 px-4">
            <p className="text-xl text-offBlack">Proposals</p>
          </div>
          <DataTable
            columns={columns}
            data={data?.data?.data.offers ?? []}
            rowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
};

export default ProposalTable;
