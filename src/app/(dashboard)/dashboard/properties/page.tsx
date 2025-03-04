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
import PropertyTable from "@/components/tables/admin/properties/data-table";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      requests.get<{
        data: AdminStats;
      }>("/admin/dashboard-summary"),
  });

  const orderStats = data?.data?.data?.propertyStats || {
    totalProperties: 0,
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Property</p>
      </div>

      {/* Order Stats Cards */}
      <div className="mt-5 rounded-lg border p-3">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          <AnalyticCard
            title={orderStats.totalProperties}
            subTitle="TOTAL PROPERTY"
            Icon={ShoppingCart}
            colorClass="bg-yellow-50 text-yellow-600"
          />
        </div>
      </div>

      <PropertyTable />
    </div>
  );
};

export default Page;
