"use client";

import React, { useState } from "react";
import { columns, renderStatus, OrderData } from "./columns";
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
import { Separator } from "@/components/ui/separator";

function getDataVendors(): OrderData[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `728ed52f-${i}`,
    date: new Date(),
    amount: Math.floor(Math.random() * 1000),
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as "pending" | "processing" | "success" | "failed",
    email: `user${i}@example.com`,
    customerName: `Vendor ${i}`,
    orderId: "234433",
    customerPhoto: `https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ERwQvLzCOxhut7YvIj6lVEY4s1a4xlDjNaL7VkptWvT~c~BDNzG2gLVlobqEFwouW-6kEjatmSUbB2uyEAnBdQS0wgOls5a0p0JoDNnTUWYvsQys3mhj2IlndFyEwkaIWV7d6wWDEqpjXFtrBC3Ni9hFlKW9lQpH5eeHjdTO1zIWPuTk~LtR6r2xB1S3GSzMI3fGveq4utQ1DrqzyzCo1Av82qz5bOJBpQV7d6EywqfL0-MwqPi6XYsQIQ5NIBmaoLaJup9Iv8cme7NjXhv5Lhht~mZAv5sOuhy3Ta1yyw2NkQhSQBZFrUTAuFzIAEzCWkm7X6yG5~eJG-WvPeXTNw__`,
  }));
}

const OrderDataTable = () => {
  const [rowData, setRowData] = useState<OrderData | undefined>();
  const [open, setOpen] = useState(false);

  const handleRowClick = (e: OrderData) => {
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

  const data = getDataVendors();

  return (
    <div>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        dismissible
        onClose={onClose}
        direction="right"
      >
        <DrawerContent className="max-w-[600px] overflow-y-auto overflow-x-hidden sm:h-5/6 h-full ml-auto border">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                  <X size={20} />
                </DrawerClose>
              </div>
              <div className="flex space-x-2 items-center">
                <p>Status</p>
                <Button variant="outline" disabled>
                  Delivered
                </Button>
                <Button variant="outline">Track Order</Button>
              </div>
            </div>
          </DrawerHeader>

          {rowData && (
            <div className="px-4">
              <div className="mt-3">
                <p className="text-sm">Date place: 27 July, 2024</p>
                <p className="text-md text-offBlack">Order ID: QW34565768</p>
              </div>

              <div className="mt-6">
                <p className="text-offBlack">Items in this Order</p>
                <div className="px-0.5 py-2 border mt-2 rounded-lg">
                  {[1, 2].map((item) => (
                    <div key={`item-in-order-${item}`} className="flex p-2">
                      <div className="rounded-md mr-3 h-24 w-36 bg-cover bg-no-repeat bg-center bg-[url(/images/Ads.png)]"></div>
                      {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
                      <div className=" flex flex-col space-y-4">
                        <p className="text-xs">QTY: 23</p>
                        <p>Dangote 3X, cement type CEMII 42.</p>
                        <p className="text-lg text-offBlack">
                          ₦ {"70000".toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-offBlack">Items in this Order</p>
                <div className="px-2 py-2 border mt-2 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p>Subtotal</p>
                    <p className="text-offBlack">₦ 18,499.00</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Delivery Fee</p>
                    <p className="text-offBlack">₦ 0.00</p>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="flex justify-between items-center mt-3">
                    <p>Total</p>
                    <p className="text-offBlack">₦ 18,499.00</p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="px-2 py-2 border mt-2 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p>Status</p>
                    <p className="text-offBlack">Success</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Payment method</p>
                    <p className="text-offBlack">Card</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-offBlack">Delivery Information</p>
                <div className="px-2 py-2 border mt-2 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p>Delivery method</p>
                    <p className="text-offBlack">Door</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Fulfilled by</p>
                    <p className="text-offBlack">Chika Trucks & Co.</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Date</p>
                    <p className="text-offBlack">Mar 7 - Mar 20, 2024</p>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="flex justify-between items-center mt-3">
                    <p>Address</p>
                    <p className="text-offBlack text-right">
                      52, Kado Crescent, Off Aminu Kano Crescent, Wuse II,
                      Abuja, Nigeria.
                    </p>
                  </div>
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
          <p className="text-xl text-offBlack">Vendor Order</p>
        </div>
        <DataTable columns={columns} data={data} rowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default OrderDataTable;
