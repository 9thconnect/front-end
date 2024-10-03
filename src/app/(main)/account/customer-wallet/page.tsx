import AnalyticCard from "@/components/cards/common/analyticCard";
import WithdrawFromWallerModal from "@/components/modals/withdrawModal";
import CustomerWalletAnalytics from "@/components/pages/customer/walletAnalysisPage";
import WithdrawalDataTable from "@/components/tables/vendors/withdrawal/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Wallet</h3>
      </div>
      <CustomerWalletAnalytics />
    </div>
  );
};

export default page;
