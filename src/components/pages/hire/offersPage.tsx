import AnalyticCard from "@/components/cards/common/analyticCard";
import ProposalTable from "@/components/tables/vendors/offers/data-table";
import { CustomerStats, VendorStats } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

const OffersPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-stats"],
    queryFn: () =>
      requests.get<{
        data: VendorStats;
      }>("/vendor/summary"),
  });

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-4 items-center mt-4">
        <AnalyticCard
          title={data?.data?.data.offerStats.pendingOffers}
          className="bg-gray-100 col-span-2"
          iconClassName="bg-gray-300!"
          subTitle="pending offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.offerStats.acceptedOffers}
          className="bg-green-100 col-span-2"
          subTitle="accepted offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data.offerStats.rejectedOffers}
          subTitle="rejected offers "
          className="bg-red-100 col-span-2"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(
            data?.data?.data.offerStats.totalProposedPrice || 0
          )}
          subTitle="total proposed"
          className="bg-red-100 col-span-2"
          Icon={UsersRound}
        />
      </div>
      <div>
        <ProposalTable />
      </div>
    </div>
  );
};

export default OffersPage;
