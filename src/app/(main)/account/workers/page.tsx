"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import AddWorkerModal from "@/components/modals/addWorkerModal";
import WorkerDataTable from "@/components/tables/vendors/workers/data-table";
import { VendorStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-stats"],
    queryFn: () =>
      requests.get<{
        data: VendorStats;
      }>("/vendor/summary"),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Workers</h3>
        {/* <Button>Add Product</Button> */}
        <AddWorkerModal />
      </div>
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          className="bg-primary/20"
          title={data?.data?.data.workerStats.totalStaffs || 0}
          subTitle="Staff total"
          Icon={UsersRound}
        />

        <AnalyticCard
          title={formatCurrency(
            data?.data?.data.workerStats.professionTotalValue || 0
          )}
          subTitle="Professional total value"
          Icon={UsersRound}
        />
      </div>
      <div>
        <WorkerDataTable />
      </div>
    </div>
  );
};

export default Page;
