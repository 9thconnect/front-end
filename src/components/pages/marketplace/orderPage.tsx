"use client";
import WishItemCard from "@/components/cards/wishCard";
import { useAppSelector } from "@/lib/redux/hooks";
import { getOrders } from "@/lib/requests/user/product";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

const OrderPage = () => {
  const [page, setPage] = useState(1);

  const userType = useAppSelector((state) => state.auth.type);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-orders", { page: page, userType: userType }],
    queryFn: getOrders,
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

  // Assuming `data` contains the orders products
  const orders = data?.data?.orders || []; // Adjust based on the actual structure of the response

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className="flex-none" key={index}>
            <Link
              key={order._id}
              href={`orders/${order._id}`}
              className="flex mb-4 cursor-pointer border rounded-xl p-2 justify-between"
            >
              <div>
                <p className="mb-2">Order ID: {order.orderID}</p>
                <p>Date: {formatDate(new Date(order.createdAt))}</p>
              </div>
              <div>
                <p className="mb-2">
                  Total Amount: {order.orderDetails.itemsTotalPrice}
                </p>
                <p>Status: {order.status}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center mt-10">Your orders is empty.</div>
      )}
    </div>
  );
};

export default OrderPage;
