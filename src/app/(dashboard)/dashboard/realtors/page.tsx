"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import RealtorBusinessesDataTable from "@/components/tables/realtors/data-table";
import { Building2 } from "lucide-react";
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

  const totalProperties = data?.data?.data?.propertyStats?.totalProperties ?? 0;

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Realtors Businesses</p>
      </div>

      {/* Property Stats */}
      <div className="mt-5 rounded-lg border p-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
          <AnalyticCard
            title={isLoading ? "Loading..." : totalProperties.toString()}
            subTitle="TOTAL PROPERTIES"
            Icon={Building2}
            colorClass="bg-blue-50 text-blue-600"
          />
        </div>
      </div>

      <RealtorBusinessesDataTable />
    </div>
  );
};

export default Page;
