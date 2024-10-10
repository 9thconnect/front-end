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
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/lib/requests/user/payment";
import { Payment } from "@/type/common";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPaymentsAdmin,
  getSinglePaymentAdmin,
} from "@/lib/requests/admin/payment";

const TransactionDataTableAdmin = () => {
  const [rowData, setRowData] = useState<Payment | undefined>();
  const [open, setOpen] = useState(false);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-transactions-admin"],
    queryFn: () => getPaymentsAdmin(),
  });

  const {
    isLoading: isSingleLoading,
    data: singleTransactionData,
    error: singleTransactionError,
    refetch: refetchSingleTransaction,
  } = useQuery({
    queryKey: ["get-single-transaction", rowData?._id],
    queryFn: () => getSinglePaymentAdmin(rowData?._id),
    enabled: !!rowData?._id && open,
  });

  const handleRowClick = (e: Payment) => {
    setRowData(e);
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
    }
  };

  function onClose() {
    setOpen(false);
  }

  return (
    <div>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="max-w-[425px] overflow-y-auto overflow-x-hidden h-4/5 ml-auto border">
          <DrawerHeader>
            <div className="flex items-center">
              <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                <X size={20} />
              </DrawerClose>
              <DrawerTitle className="font-thin text-offBlack">
                Payment Receipt
              </DrawerTitle>
            </div>
          </DrawerHeader>

          {isSingleLoading ? (
            <div className="p-4 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : singleTransactionError ? (
            <div className="p-4 text-red-500">
              Error loading transaction details
            </div>
          ) : singleTransactionData?.data ? (
            <div className="px-3 mt-4">
              <div className="p-4 rounded-lg mb-4 relative border text-center">
                <div className="p-2 rounded-full bg-primary/20 flex justify-center items-center absolute -top-5 right-1/2">
                  <ReceiptText size={15} className="text-primary" />
                </div>
                <div className="mt-3">
                  <p>
                    {new Date(
                      singleTransactionData.data.paymentDate
                    ).toLocaleString()}
                  </p>
                  <p className="text-3xl font-bold text-offBlack my-3">
                    {formatCurrency(singleTransactionData.data.amount)}
                  </p>
                  {renderStatus(singleTransactionData.data.status)}
                </div>
              </div>
              <div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Customer</p>
                  <p>{singleTransactionData.data.payerName}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Email</p>
                  <p>{singleTransactionData.data.payerEmail}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Phone</p>
                  <p>{singleTransactionData.data.payerPhoneNumber}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Invoice Ref</p>
                  <p>{singleTransactionData.data.invoiceRef}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Order ID</p>
                  <p>{singleTransactionData.data.order.orderID}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Payment Method</p>
                  <p>{singleTransactionData.data.payment_options}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Order Status</p>
                  <p>{singleTransactionData.data.order.status}</p>
                </div>
                <div className="mt-5">
                  <p className="font-bold mb-3">Order Items:</p>
                  {singleTransactionData.data.order.orderItems.map(
                    (item, index) => (
                      <div key={index} className="border-b pb-3 mb-3">
                        <p>
                          {item.name} x {item.quantity}
                        </p>
                        <p>Price: {formatCurrency(item.price)}</p>
                        <p>Total: {formatCurrency(item.total)}</p>
                      </div>
                    )
                  )}
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p className="font-bold text-offBlack">Total Amount</p>
                  <p className="font-bold text-offBlack">
                    {formatCurrency(singleTransactionData.data.amount)}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <DrawerFooter className="w-full">
            <div className="flex w-full space-x-4">
              <Button className="w-full">Download</Button>
              <Button className="w-full" variant="outline">
                Print
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {isError && (
        <div>
          <p>Error loading data</p>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {/* Repeat this block for the number of rows you want to display as loading */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-2 px-4">
              {/* Table columns loader */}
              <Skeleton className="h-6 w-16" /> {/* First Column */}
              <Skeleton className="h-6 w-24" /> {/* Second Column */}
              <Skeleton className="h-6 w-32" /> {/* Third Column */}
              <Skeleton className="h-6 w-20" /> {/* Fourth Column */}
              <Skeleton className="h-6 w-20" /> {/* Fifth Column */}
              <Skeleton className="h-6 w-20" /> {/* Sixth Column */}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="border rounded-t-xl py-4 px-4">
            <div className="md:flex flex-wrap justify-between items-center">
              <Input
                type="text"
                placeholder="Search"
                className="md:max-w-60 w-full"
              />
              <div className="md:flex md:space-x-2">
                <div className="md:flex md:space-x-2 items-center">
                  <FilterSelect
                    label="Status"
                    options={[
                      {
                        name: "Pending",
                        value: 1,
                      },
                      {
                        name: "Failed",
                        value: 0,
                      },
                      {
                        name: "Successful",
                        value: 1,
                      },
                    ]}
                    placeholder="Status"
                  />
                </div>
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={data?.data?.payments || []}
            rowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionDataTableAdmin;
