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
import {
  X,
  CheckCircle,
  Clock,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPayments } from "@/lib/requests/user/payment";
import { Order, Payment } from "@/type/common";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPaymentsAdmin,
  getSinglePaymentAdmin,
} from "@/lib/requests/admin/payment";
import { getOrder, getOrders } from "@/lib/requests/user/product";
import { formatDate } from "@/utils/format-date";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import requests from "@/utils/requests";
import axios from "axios";

const OrderTableAdmin = () => {
  const [rowData, setRowData] = useState<Order | undefined>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-orders", { page: page, userType: "admin" }],
    queryFn: getOrders,
  });

  const {
    isLoading: isSingleLoading,
    isError: isSingleError,
    data: singleOrder,
    error: singleError,
    refetch: singleRefetch,
    isFetching: isFetchingSingle,
  } = useQuery({
    queryKey: ["get-order", { id: rowData?._id, userType: "admin" }],
    queryFn: getOrder,
  });

  const handleRowClick = (e: Order) => {
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
  type OrderStatus =
    | "pending"
    | "received"
    | "processing"
    | "shipped"
    | "delivered"
    | "delivered"
    | "cancelled";

  const orderStatuses: Array<{
    value: OrderStatus;
    label: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    { value: "pending", label: "Pending", icon: Clock },
    { value: "processing", label: "Processing", icon: Package },
    { value: "shipped", label: "Shipped", icon: Truck },
    { value: "delivered", label: "Delivered", icon: CheckCircle },
    { value: "cancelled", label: "Cancelled", icon: AlertCircle },
  ];

  const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
      pending: "text-yellow-500",
      processing: "text-blue-500",
      shipped: "text-purple-500",
      delivered: "text-green-500",
      cancelled: "text-red-500",
      received: "text-green-800",
    };
    return colors[status] || "text-gray-500";
  };

  const handleStatusChange = async (newStatus: OrderStatus): Promise<void> => {
    if (!singleOrder?.data?.orderID) return;

    setIsUpdatingStatus(true);
    try {
      await requests.patch(
        `/order/admin/update-order-status/${singleOrder.data._id}/${newStatus}`,
        {}
      );

      queryClient.invalidateQueries({
        queryKey: [`get-order`, { id: rowData?._id, userType: "admin" }],
      });

      toast("Status Updated", {
        description: `Order status has been updated to ${newStatus.toLowerCase()}`,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
        // Just a stock error
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const renderStatus = (status: OrderStatus) => {
    const StatusIcon =
      orderStatuses.find((s) => s.value === status)?.icon || Clock;
    const statusColor = getStatusColor(status);

    return (
      <div className="flex items-center space-x-2">
        <StatusIcon className={`h-5 w-5 ${statusColor}`} />
        <span className={statusColor}>{status}</span>
      </div>
    );
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="max-w-[425px] h-full ml-auto border flex flex-col">
          <DrawerHeader className="border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                  <X size={20} />
                </DrawerClose>
                <DrawerTitle className="font-thin text-offBlack">
                  Order Detail
                </DrawerTitle>
              </div>
              {singleOrder?.data && (
                <Select
                  defaultValue={singleOrder.data.status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdatingStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      {renderStatus(singleOrder.data.status)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center space-x-2">
                          <status.icon
                            className={`h-4 w-4 ${getStatusColor(
                              status.value
                            )}`}
                          />
                          <span>{status.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </DrawerHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4">
            {isSingleLoading ? (
              <div className="p-4 space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : singleError ? (
              <div className="p-4 text-red-500">
                Error loading transaction details
              </div>
            ) : singleOrder?.data ? (
              <div className=" rounded-2xl p-2 my-4">
                {/* Rest of the content remains the same */}
                <div className="flex justify-between items-center border-b pb-2">
                  {renderStatus(singleOrder.data.status)}
                </div>
                <div className="mt-3">
                  <p className="text-sm">
                    Date place:{" "}
                    {formatDate(new Date(singleOrder?.data?.dateOrdered))}
                  </p>
                  <p className="text-md text-offBlack">
                    Order ID: {singleOrder?.data?.orderID}
                  </p>
                </div>

                {/* Items Section */}
                <div className="mt-6">
                  <p className="text-offBlack">Items in this Order</p>
                  <div className="px-0.5 py-2 border mt-2 rounded-lg">
                    {singleOrder?.data?.orderItems.map((item) => (
                      <Link
                        href={`/marketplace/${item.productId}`}
                        key={`item-in-order-${item}`}
                        className="flex p-2 py-4"
                      >
                        <div
                          className="rounded-md mr-3 h-24 w-36 bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="flex flex-col space-y-4">
                          <p className="text-xs">QTY: {item.quantity}</p>
                          <p>{item.name}</p>
                          <p className="text-lg text-offBlack">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Order Costing Section */}
                <div className="mt-6">
                  <p className="text-offBlack">Order Costing</p>
                  <div className="px-2 py-2 border mt-2 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p>Item Total Price</p>
                      <p className="text-offBlack">
                        {formatCurrency(
                          singleOrder?.data?.orderDetails.itemsTotalPrice
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p>Extra Price</p>
                      <p className="text-offBlack">
                        {formatCurrency(
                          singleOrder?.data?.orderDetails.extraPrice
                        )}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="flex justify-between items-center my-3">
                      <p>Total Price</p>
                      <p className="text-offBlack">
                        {formatCurrency(
                          singleOrder?.data?.orderDetails.totalPrice
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mt-2">
                  <div className="px-2 py-2 border mt-2 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p>Invoice Reference</p>
                      <p className="text-offBlack">
                        {singleOrder?.data?.payment?.invoiceRef}
                      </p>
                    </div>
                    <div className="flex justify-between items-center my-3">
                      <p>Payer Name</p>
                      <p className="text-offBlack">
                        {singleOrder?.data?.payment?.payerName}
                      </p>
                    </div>
                    <div className="flex justify-between items-center my-3">
                      <p>Status</p>
                      <p className="text-offBlack">
                        {singleOrder?.data?.payment?.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mt-6">
                  <p className="text-offBlack">Delivery Information</p>
                  <div className="px-2 py-2 border mt-2 rounded-lg">
                    <div className="flex justify-between items-center mt-3">
                      <p>Address</p>
                      <p className="text-offBlack text-right">
                        {singleOrder?.data?.shippingAddress.address}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p>City</p>
                      <p className="text-offBlack text-right">
                        {singleOrder?.data?.shippingAddress.city}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p>State</p>
                      <p className="text-offBlack text-right">
                        {singleOrder?.data?.shippingAddress.state}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p>Postal Code</p>
                      <p className="text-offBlack text-right">
                        {singleOrder?.data?.shippingAddress.postalCode}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p>Country</p>
                      <p className="text-offBlack text-right">
                        {singleOrder?.data?.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Fixed Footer */}
          <DrawerFooter className="border-t sticky bottom-0 bg-white z-10">
            <div className="flex w-full space-x-4">
              {singleOrder?.data && (
                <Select
                  defaultValue={singleOrder.data.status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdatingStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      {renderStatus(singleOrder.data.status)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center space-x-2">
                          <status.icon
                            className={`h-4 w-4 ${getStatusColor(
                              status.value
                            )}`}
                          />
                          <span>{status.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button className="w-full">Download</Button>
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
            data={data?.data?.orders || []}
            rowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
};

export default OrderTableAdmin;
