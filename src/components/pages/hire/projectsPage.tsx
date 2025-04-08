"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import ProjectTable from "@/components/tables/vendors/projects/data-table";
import { CustomerStats, VendorStats } from "@/type/users";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

function ProjectsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-stats"],
    queryFn: () =>
      requests.get<{
        data: VendorStats;
      }>("/vendor/summary"),
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-4">
        <AnalyticCard
          title={data?.data?.data.projectStats.startedProjects || 0}
          className="bg-gray-100"
          iconClassName="bg-gray-300!"
          subTitle="started projects"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.projectStats.completedProjects || 0}
          className="bg-green-100"
          subTitle="completed projects"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.projectStats.cancelledProjects || 0}
          subTitle="cancelled projects"
          className="bg-red-100"
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
