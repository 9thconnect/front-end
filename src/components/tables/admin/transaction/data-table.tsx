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
import { DatePickerWithRange } from "@/components/common/datePickerRange";

const TransactionDataTableAdmin = ({
  vendor,
  paymentFor,
}: {
  vendor?: string;
  paymentFor?: "order" | "service" | "withdrawal" | "payout";
}) => {
  const [rowData, setRowData] = useState<Payment | undefined>();
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  // State for filters
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [completedPayment, setCompletedPayment] = useState<boolean | undefined>(
    undefined
  );
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: [
      "get-transactions-admin",
      search,
      status,
      completedPayment,
      dateRange.from,
      dateRange.to,
      paymentFor,
      vendor,
      pageIndex,
      pageSize,
    ],
    queryFn: () =>
      getPaymentsAdmin(
        search || undefined,
        pageIndex + 1, // pageNumber
        undefined, // filterByProductCategory
        status,
        completedPayment,
        dateRange.from?.toISOString(),
        dateRange.to?.toISOString(),
        paymentFor,
        vendor
      ),
  });

  const totalPages = data?.data?.pages ?? 0;

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

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus(undefined);
    setCompletedPayment(undefined);
    setDateRange({});
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="max-w-[425px] overflow-y-auto overflow-x-hidden h-full ml-auto border">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 py-2 px-4 mt-8"
            >
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
          <div className="border rounded-t-xl py-4 px-4">
            <div className="md:flex flex-wrap justify-between items-center space-y-2 md:space-y-0">
              <Input
                type="text"
                placeholder="Search transactions"
                className="md:max-w-60 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Status"
                  options={[
                    { name: "Pending", value: "pending" },
                    { name: "Failed", value: "failed" },
                    { name: "Successful", value: "successful" },
                  ]}
                  placeholder="Status"
                  state={[status, setStatus]}
                />
                <FilterSelect
                  label="Payment Type"
                  options={[
                    { name: "Completed", value: true },
                    { name: "Incomplete", value: false },
                  ]}
                  placeholder="Payment Status"
                  state={[completedPayment, setCompletedPayment]}
                />
                <DatePickerWithRange
                  onDateChange={handleDateRangeChange}
                  selectedRange={dateRange}
                />
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="ml-2"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={data?.data?.payments || []}
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

export default TransactionDataTableAdmin;
