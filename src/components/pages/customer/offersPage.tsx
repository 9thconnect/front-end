import AnalyticCard from "@/components/cards/common/analyticCard";
import CustomerProposalTable from "@/components/tables/users/offers/data-table";
import ProposalTable from "@/components/tables/vendors/offers/data-table";
import { UsersRound } from "lucide-react";
import React from "react";

const CustomerOffersPage = () => {
  return (
    <div>
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          title="50"
          className="bg-gray-100"
          iconClassName="bg-gray-300!"
          subTitle="pending offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title="50"
          className="bg-green-100"
          subTitle="accepted offers"
          Icon={UsersRound}
        />
        <AnalyticCard
          title="50"
          subTitle="rejected offers"
          className="bg-red-100"
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
