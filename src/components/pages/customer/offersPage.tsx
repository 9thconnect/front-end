"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import CustomerProposalTable from "@/components/tables/users/offers/data-table";
import ProposalTable from "@/components/tables/vendors/offers/data-table";
import { CustomerStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

const CustomerOffersPage = () => {
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
          title={data?.data?.data.offerStats.pendingOffers || 0}
          className="bg-gray-100 col-span-2"
          iconClassName="bg-gray-300!"
          subTitle="pending offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.offerStats.acceptedOffers || 0}
          className="bg-green-100 col-span-2"
          subTitle="accepted offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.offerStats.rejectedOffers || 0}
          subTitle="rejected offers "
          className="bg-red-100 col-span-2"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(
            data?.data?.data.offerStats.totalProposedPrice || 0
          )}
          subTitle="total proposed"
          className="bg-gray-300 col-span-2"
          Icon={UsersRound}
        />
      </div>
      <div>
        <CustomerProposalTable />
      </div>
    </div>
  );
};

export default CustomerOffersPage;
