"use client";

import React, { useState } from "react";
import { columns, renderStatus } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReceiptText, X } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Proposal } from "@/type/professional";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProposals,
  payForProject,
  withdrawProposal,
} from "@/lib/requests/user/bidding";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { X as CloseIcon } from "lucide-react";

const CustomerProposalTable = () => {
  const [rowData, setRowData] = useState<Proposal | undefined>();
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const handleRowClick = (e: Proposal) => {
    setRowData(e);
    setOpen(true);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["proposals", pageIndex, pageSize],
    queryFn: () => getProposals(pageIndex + 1),
  });

  const totalPages = data?.data?.data?.pages ?? 0;

  const queryClient = useQueryClient();

  const payForProjectMutation = useMutation({
    mutationFn: (offerId: string) =>
      payForProject({
        offerId,
        redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}/hire/payment/confirm`,
      }),
    onSuccess: (response) => {
      window.location.href = response.data?.checkout as string;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error);
      toast.error(error.response?.data.message || "Payment initiation failed");
    },
  });

  const withdrawOfferMutation = useMutation({
    mutationFn: (offerId: string) =>
      withdrawProposal({
        offerId,
        withdrawReason,
      }),
    onSuccess: (response) => {
      toast.success(response.message.replace("withdraw", "withdrawn"));
      queryClient.invalidateQueries();
      setIsWithdrawModalOpen(false);
      setWithdrawReason("");
      setOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error);
      toast.error(error.response?.data.message || "Withdrawal failed");
    },
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
      setIsWithdrawing(false);
      setWithdrawReason("");
    }
  };

  function onClose() {
    setOpen(false);
  }

  const handlePayForProject = () => {
    if (!rowData) return;
    payForProjectMutation.mutate(rowData._id);
  };

  const handleWithdrawOffer = () => {
    if (!rowData) return;
    withdrawOfferMutation.mutate(rowData._id);
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
                <CloseIcon size={20} />
              </DrawerClose>
              <DrawerTitle className="font-thin text-offBlack">
                Offer Details
              </DrawerTitle>
            </div>
            <div className="flex space-x-2 items-center">
              {rowData && rowData?.status === "accepted" && !rowData.isPaid && (
                <Button
                  className="w-full"
                  onClick={handlePayForProject}
                  disabled={payForProjectMutation.isPending}
                >
                  {payForProjectMutation.isPending
                    ? "Processing..."
                    : "Pay for Project"}
                </Button>
              )}
              {rowData && rowData?.status === "pending" && !rowData.isPaid && (
                <>
                  {!isWithdrawing ? (
                    <Button
                      className="w-full"
                      onClick={() => setIsWithdrawing(true)}
                    >
                      Withdraw Proposal
                    </Button>
                  ) : (
                    <div className="w-full space-y-2">
                      <Textarea
                        placeholder="Enter withdrawal reason..."
                        value={withdrawReason}
                        onChange={(e) => setWithdrawReason(e.target.value)}
                        className="min-h-[100px]"
                        disabled={withdrawOfferMutation.isPending}
                      />
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setIsWithdrawing(false);
                            setWithdrawReason("");
                          }}
                          disabled={withdrawOfferMutation.isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="w-full"
                          onClick={handleWithdrawOffer}
                          disabled={
                            !withdrawReason.trim() ||
                            withdrawOfferMutation.isPending
                          }
                        >
                          {withdrawOfferMutation.isPending
                            ? "Processing..."
                            : "Submit"}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </DrawerHeader>

          {rowData && (
            <div className="flex-grow overflow-y-auto px-3 mt-4 pt-10 pb-20">
              {/* Rest of the drawer content remains the same */}
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
                {/* Existing detail sections remain the same */}
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
            {rowData?.status === "accepted" && !rowData.isPaid && (
              <Button
                className="w-full"
                onClick={handlePayForProject}
                disabled={payForProjectMutation.isPending}
              >
                {payForProjectMutation.isPending
                  ? "Processing..."
                  : "Pay for Project"}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-2 px-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
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
            pageCount={totalPages}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerProposalTable;
