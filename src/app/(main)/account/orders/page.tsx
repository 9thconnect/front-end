"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import OrderPage from "@/components/pages/marketplace/orderPage";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { StatsSeller } from "@/type/users";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { MonitorPlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  const type = useAppSelector((state) => state.auth.type);
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-stats-vendor-summary"],
    queryFn: () =>
      requests.get<{
        data: StatsSeller;
      }>("/vendor/summary"),
    enabled: type === "vendor",
  });
  return (
    <div>
      {type == "vendor" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
          <AnalyticCard
            title={data?.data?.data?.orderStats.pendingOrders || 0}
            subTitle="PENDING ORDERS"
            Icon={MonitorPlay}
          />
          <AnalyticCard
            title={data?.data?.data?.orderStats.receivedOrders || 0}
            subTitle="RECEIVED ORDERS"
            Icon={MonitorPlay}
          />
          <AnalyticCard
            title={data?.data?.data?.orderStats.processingOrders || 0}
            subTitle="PROCESSING ORDERS"
            Icon={MonitorPlay}
          />
          <AnalyticCard
            title={data?.data?.data?.orderStats.shippedOrders || 0}
            subTitle="SHIPPED ORDERS"
            Icon={MonitorPlay}
          />
          <AnalyticCard
            title={data?.data?.data?.orderStats.deliveredOrders || 0}
            subTitle="DELIVERED ORDERS"
            Icon={MonitorPlay}
          />
          <AnalyticCard
            title={data?.data?.data?.orderStats.cancelledOrders || 0}
            subTitle="CANCELLED ORDERS"
            Icon={MonitorPlay}
          />
        </div>
      )}

      <div className="pb-2">
        <h3 className="text-xl text-offBlack my-2">Order History</h3>
        <OrderPage />
      </div>
    </div>
  );
};

export default page;
