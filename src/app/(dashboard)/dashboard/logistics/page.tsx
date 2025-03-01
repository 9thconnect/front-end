"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import LogisticBusinessesDataTable from "@/components/tables/logistics/data-table";
import { Truck } from "lucide-react";
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

  const totalFleets = data?.data?.data?.logisticStats?.totalFleets ?? 0;

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Logistics Businesses</p>
      </div>

      {/* Logistic Stats */}
      <div className="mt-5 rounded-lg border p-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
          <AnalyticCard
            title={isLoading ? "Loading..." : totalFleets.toString()}
            subTitle="TOTAL FLEETS"
            Icon={Truck}
            colorClass="bg-green-50 text-green-600"
          />
        </div>
      </div>

      <LogisticBusinessesDataTable />
    </div>
  );
};

export default Page;
