"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import AdminProductTable from "@/components/tables/admin/products/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { Package } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { AdminStats } from "@/type/users";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      requests.get<{ data: AdminStats }>("/admin/dashboard-summary"),
  });

  const totalProducts = data?.data?.data?.productStats?.totalProducts ?? 0;
  const totalProductValue =
    data?.data?.data?.productStats?.totalProductValue ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Products on 9th</h3>
      </div>

      {/* Product Stats */}
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          title={isLoading ? "Loading..." : totalProducts.toString()}
          subTitle="ALL ITEMS/PRODUCTS"
          Icon={Package}
          colorClass="bg-blue-50 text-blue-600"
        />
        <AnalyticCard
          title={isLoading ? "Loading..." : formatCurrency(totalProductValue)}
          subTitle="TOTAL VALUE"
          Icon={Package}
          colorClass="bg-green-50 text-green-600"
        />
      </div>

      <div>
        <AdminProductTable />
      </div>
    </div>
  );
};

export default Page;
