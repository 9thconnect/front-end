"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import ProjectTable from "@/components/tables/users/projects/data-table";
import { CustomerStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

function ProjectsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["customer-stats"],
    queryFn: () =>
      requests.get<{
        data: CustomerStats;
      }>("/customer/summary"),
  });

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-4 items-center mt-4">
        <AnalyticCard
          title={data?.data?.data.projectStats.startedProjects || 0}
          className="bg-gray-100 col-span-2"
          iconClassName="bg-gray-300!"
          subTitle="started project"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.projectStats.completedProjects || 0}
          className="bg-green-100 col-span-2"
          subTitle="completed project"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.projectStats.cancelledProjects || 0}
          subTitle="cancelled project "
          className="bg-red-100 col-span-2"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(
            data?.data?.data.projectStats.totalProjectAmountSpent || 0
          )}
          subTitle="total project amount"
          className="bg-indigo-100 col-span-2"
          Icon={UsersRound}
        />
      </div>
      <div>
        <ProjectTable />
      </div>
    </div>
  );
}

export default ProjectsPage;
