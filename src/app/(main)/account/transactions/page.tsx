"use client";
import AnalyticCard from "@/components/cards/common/analyticCard";
import TransactionDataTable from "@/components/tables/users/transaction/data-table";
import { CustomerStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["customer-stats"],
    queryFn: () =>
      requests.get<{
        data: CustomerStats;
      }>("/customer/summary"),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Transactions</h3>
      </div>
      <div className="flex-wrap md:flex-nowrap flex md:space-x-3 space-y-3 md:space-y-0 items-center mt-4">
        <AnalyticCard
          title={data?.data?.data.transactionStats.pendingPayments || 0}
          subTitle="Pending Payments"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.transactionStats.approvedPayments || 0}
          subTitle="Approved Payments"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.transactionStats.failedPayments || 0}
          subTitle="Failed Payments"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(
            data?.data?.data.transactionStats.totalAmountSpent || 0
          )}
          subTitle="Total Amount Spent"
          Icon={UsersRound}
        />
      </div>
      <div>
        <TransactionDataTable />
      </div>
    </div>
  );
};

export default Page;
