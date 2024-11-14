import AnalyticCard from "@/components/cards/common/analyticCard";
import TransactionDataTable from "@/components/tables/users/transaction/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Transactions</h3>
      </div>
      {/* <div className="flex-wrap md:flex-nowrap flex md:space-x-3 space-y-3 md:space-y-0 items-center mt-4">
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="Approved"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="Pending"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="Failed"
          Icon={UsersRound}
        />
      </div> */}
      <div>
        <TransactionDataTable />
      </div>
    </div>
  );
};

export default page;
