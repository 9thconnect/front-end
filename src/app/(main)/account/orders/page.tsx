import OrderPage from "@/components/pages/marketplace/orderPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const orders = [
  {
    id: "3WS4DRTFYG",
    date: "Jan 20, 2024",
    totalAmount: "₦ 50,700.00",
    status: "Pending",
    href: "/orders/jfjfj",
  },
  {
    id: "7HJ9KLQWOP",
    date: "Feb 15, 2024",
    totalAmount: "₦ 120,000.00",
    status: "Shipped",
  },
  {
    id: "2MNBVCXZ12",
    date: "Mar 5, 2024",
    totalAmount: "₦ 75,250.00",
    status: "Delivered",
  },
  {
    id: "9POIUYTREW",
    date: "Apr 10, 2024",
    totalAmount: "₦ 32,000.00",
    status: "Cancelled",
  },
  {
    id: "6LKJHGFDSA",
    date: "May 25, 2024",
    totalAmount: "₦ 89,450.00",
    status: "Processing",
  },
];

const page = () => {
  return (
    <div>
      <div className="pb-2">
        <h3 className="text-xl text-offBlack my-2">Order History</h3>
        <OrderPage />
      </div>
    </div>
  );
};

export default page;
