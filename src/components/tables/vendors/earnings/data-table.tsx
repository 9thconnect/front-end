"use client";

import React, { useState } from "react";
import { columns, renderStatus, EarningData } from "./columns";
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

const EarningDataTable = ({ data }: { data: EarningData[] }) => {
  const [rowData, setRowData] = useState<EarningData | undefined>();
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const totalPages = 0;

  const handleRowClick = (e: EarningData) => {
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
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        dismissible
        onClose={onClose}
        direction="right"
      >
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

          {rowData && (
            <div className="px-3 mt-4">
              <div className="p-4 rounded-lg mb-4 relative border text-center">
                <div className="p-2 rounded-full bg-primary/20 flex justify-center items-center absolute -top-5 right-1/2">
                  <ReceiptText size={15} className="text-primary" />
                </div>
                <div className="mt-3">
                  <p>Jan 20, 2024 - 08:45 PM</p>
                  <p className="text-3xl font-bold text-offBlack my-3">
                    {formatCurrency(rowData.amount)}
                  </p>
                  {renderStatus(rowData.status)}
                </div>
              </div>
              <div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Customer</p>
                  <p>{rowData.customerName}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Ben Vendor</p>
                  <p>7central Ventures</p>
                </div>

                <div className="border-b pb-5 mt-20 flex justify-between items-center">
                  <p>Method</p>
                  <p>Card</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Subtotal</p>
                  <p>{formatCurrency(4000000000)}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p className="font-bold text-offBlack">Total</p>
                  <p className="font-bold text-offBlack">
                    {formatCurrency(4000000000)}
                  </p>
                </div>
              </div>
            </div>
          )}

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

      <div className="mt-5">
        <div className="border rounded-t-xl py-8 px-4">
          <p className="text-xl text-offBlack">Vendor Earning</p>
        </div>
        <DataTable
          columns={columns}
          data={data}
          rowClick={handleRowClick}
          pageCount={totalPages}
          pageSize={pageSize}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default EarningDataTable;
