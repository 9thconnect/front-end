"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import { ReceiptText, HandshakeIcon, Wallet, XCircle } from "lucide-react";
import React, { Suspense } from "react";
import TransactionDataTableAdmin from "@/components/tables/admin/transaction/data-table";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { AdminStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      requests.get<{
        data: AdminStats;
      }>("/admin/dashboard-summary"),
  });

  const transactionStats = data?.data?.data?.transactionStats || {
    pendingPayments: 0,
    approvedPayments: 0,
    failedPayments: 0,
    totalPayments: 0,
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Transactions</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
          <AnalyticCard
            title={formatCurrency(transactionStats.totalPayments)}
            subTitle="TOTAL REVENUE"
            Icon={ReceiptText}
            colorClass="bg-purple-50 text-purple-600"
          />
          <AnalyticCard
            title={transactionStats.approvedPayments}
            subTitle="APPROVED PAYMENTS"
            Icon={HandshakeIcon}
            colorClass="bg-blue-50 text-blue-600"
          />
          <AnalyticCard
            title={transactionStats.pendingPayments}
            subTitle="PENDING PAYMENTS"
            Icon={Wallet}
            colorClass="bg-yellow-50 text-yellow-600"
          />
          <AnalyticCard
            title={transactionStats.failedPayments}
            subTitle="FAILED PAYMENTS"
            Icon={XCircle}
            colorClass="bg-red-50 text-red-600"
          />
        </div>
      </Suspense>
      <Suspense>
        <TransactionDataTableAdmin />
      </Suspense>
    </div>
  );
};

export default Page;
