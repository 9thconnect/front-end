import AnalyticCard from "@/components/cards/common/analyticCard";
import WithdrawFromWallerModal from "@/components/modals/withdrawModal";
import WithdrawalDataTable from "@/components/tables/vendors/withdrawal/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Wallet</h3>
        {/* <Button>Add Product</Button> */}
        {/* <AddProductModal /> */}
        <WithdrawFromWallerModal />
      </div>
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="escrow account"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="total balance"
          Icon={UsersRound}
        />
      </div>
      <div>
        <WithdrawalDataTable />
      </div>
    </div>
  );
};

export default page;
