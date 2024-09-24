"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/redux/hooks";
import { getOrder } from "@/lib/requests/user/product";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const SingleOrderPage = ({ id }: { id: string }) => {
  const userType = useAppSelector((state) => state.auth.type);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-order", { id: id, userType: userType }],
    queryFn: getOrder,
  });

  // Handle loading state
  if (isLoading || isFetching) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="hidden sm:block text-xl text-offBlack">
          Order Detail {data?.data?.orderID}
        </h3>
        <div className="flex space-x-2 items-center">
          <p>Status</p>
          <Button variant="outline" disabled>
            {data?.data?.status}
          </Button>
          <Button variant="outline">Track Order</Button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm">
          Date place: {formatDate(new Date(data?.data?.dateOrdered as string))}
        </p>
        <p className="text-md text-offBlack">Order ID: {data?.data?.orderID}</p>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-0.5 py-2 border mt-2 rounded-lg">
          {data?.data?.orderItems.map((item) => (
            <Link
              href={`/marketplace/${item.productId}`}
              key={`item-in-order-${item}`}
              className="flex p-2 py-4"
            >
              <div
                className="rounded-md mr-3 h-24 w-36 bg-cover bg-no-repeat bg-center "
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
              <div className=" flex flex-col space-y-4">
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
      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Item Total Price</p>
            <p className="text-offBlack">
              {formatCurrency(
                data?.data?.orderDetails.itemsTotalPrice as number
              )}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Extra Price</p>
            <p className="text-offBlack">
              {formatCurrency(data?.data?.orderDetails.extraPrice as number)}
            </p>
          </div>

          <Separator orientation="horizontal" />
          <div className="flex justify-between items-center my-3">
            <p>Total Price</p>
            <p className="text-offBlack">
              {formatCurrency(data?.data?.orderDetails.totalPrice as number)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Invoice Reference</p>
            <p className="text-offBlack">{data?.data?.payment?.invoiceRef}</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Payer Name</p>
            <p className="text-offBlack">{data?.data?.payment?.payerName}</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Status</p>
            <p className="text-offBlack">{data?.data?.payment?.status}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Delivery Information</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          {/* <div className="flex justify-between items-center">
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
          <Separator orientation="horizontal" /> */}
          <div className="flex justify-between items-center mt-3">
            <p>Address</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.address}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>City</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.city}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>State</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.state}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Postal Code</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.postalCode}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Country</p>
            <p className="text-offBlack text-right">
              {data?.data?.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
