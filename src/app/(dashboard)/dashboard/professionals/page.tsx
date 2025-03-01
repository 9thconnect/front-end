"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import ProfessionalDataTable from "@/components/tables/professionals/data-table";
import { UsersRoundIcon, DollarSignIcon } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { formatCurrency } from "@/utils/format-currency";
import { AdminStats } from "@/type/users";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profession-stats"],
    queryFn: () =>
      requests.get<{
        data: AdminStats;
      }>("/admin/dashboard-summary"),
  });

  const professionStats = data?.data?.data.professionStats || {
    totalProfessions: 0,
    professionTotalValue: 0,
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Professionals</p>
      </div>
      <div className="mt-5 rounded-lg border p-3">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-5 mt-3">
          <AnalyticCard
            title={professionStats.totalProfessions}
            subTitle="TOTAL PROFESSIONALS"
            Icon={UsersRoundIcon}
            colorClass="bg-purple-50 text-purple-600"
          />
          <AnalyticCard
            title={formatCurrency(professionStats.professionTotalValue)}
            subTitle="TOTAL VALUE"
            Icon={DollarSignIcon}
            colorClass="bg-blue-50 text-blue-600"
          />
        </div>
      </div>
      <ProfessionalDataTable />
    </div>
  );
};

export default Page;
