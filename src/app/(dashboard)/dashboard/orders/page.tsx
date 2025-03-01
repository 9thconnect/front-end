"use client";

import OrderTableAdmin from "@/components/tables/admin/orders/data-table";
import AnalyticCard from "@/components/cards/common/analyticCard";
import {
  Package,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { formatCurrency } from "@/utils/format-currency";
import { AdminStats } from "@/type/users";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      requests.get<{
        data: AdminStats;
      }>("/admin/dashboard-summary"),
  });

  const orderStats = data?.data?.data?.orderStats || {
    pendingOrders: 0,
    receivedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalOrderedAmount: 0,
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Orders</p>
      </div>

      {/* Order Stats Cards */}
      <div className="mt-5 rounded-lg border p-3">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          <AnalyticCard
            title={orderStats.pendingOrders}
            subTitle="PENDING ORDERS"
            Icon={ShoppingCart}
            colorClass="bg-yellow-50 text-yellow-600"
          />
          <AnalyticCard
            title={orderStats.receivedOrders}
            subTitle="RECEIVED ORDERS"
            Icon={Package}
            colorClass="bg-blue-50 text-blue-600"
          />
          <AnalyticCard
            title={orderStats.processingOrders}
            subTitle="PROCESSING ORDERS"
            Icon={Truck}
            colorClass="bg-purple-50 text-purple-600"
          />
          <AnalyticCard
            title={orderStats.shippedOrders}
            subTitle="SHIPPED ORDERS"
            Icon={Truck}
            colorClass="bg-green-50 text-green-600"
          />
          <AnalyticCard
            title={orderStats.deliveredOrders}
            subTitle="DELIVERED ORDERS"
            Icon={CheckCircle}
            colorClass="bg-teal-50 text-teal-600"
          />
          <AnalyticCard
            title={orderStats.cancelledOrders}
            subTitle="CANCELLED ORDERS"
            Icon={XCircle}
            colorClass="bg-red-50 text-red-600"
          />
          <AnalyticCard
            title={formatCurrency(orderStats.totalOrderedAmount)}
            subTitle="TOTAL ORDERED VALUE"
            Icon={ShoppingCart}
            colorClass="bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      <OrderTableAdmin />
    </div>
  );
};

export default Page;
