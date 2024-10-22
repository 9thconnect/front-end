"use client";

import React, { useState } from "react";
import { columns } from "./columns";
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
import {
  getPayments,
  getSinglePaymentCustomer,
} from "@/lib/requests/user/payment";
import { Payment } from "@/type/common";
import { Skeleton } from "@/components/ui/skeleton";
import { getSinglePaymentAdmin } from "@/lib/requests/admin/payment";
import PaymentReceiptDrawer from "@/components/cards/common/singleTransactionDrawer";
import { renderPaymentStatus } from "@/components/cards/common/renderPaymentStatus";

const TransactionDataTable = () => {
  const [rowData, setRowData] = useState<Payment | undefined>();
  const [open, setOpen] = useState(false);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: () => getPayments(),
  });

  const {
    isLoading: isSingleLoading,
    data: singleTransactionData,
    error: singleTransactionError,
    refetch: refetchSingleTransaction,
  } = useQuery({
    queryKey: ["get-single-transaction", { id: rowData?._id }],
    queryFn: () => getSinglePaymentCustomer(rowData?._id),
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
      <PaymentReceiptDrawer
        open={open}
        onOpenChange={onOpenChange}
        onClose={onClose}
        singleTransactionData={
          singleTransactionData?.data ? singleTransactionData.data : null
        }
        isSingleLoading={isSingleLoading}
        singleTransactionError={singleTransactionError as Error | null}
      />

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

export default TransactionDataTable;
