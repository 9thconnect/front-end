"use client";

import React from "react";
import AnalyticCard from "@/components/cards/common/analyticCard";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { IUser } from "@/type/users";

const CustomerWalletAnalytics = () => {
  const auth = useAppSelector((state) => state.auth);

  const userData = auth.data as IUser;
  return (
    <div className="flex space-x-3 items-center mt-4">
      <AnalyticCard
        title={formatCurrency(userData?.wallet?.availableBalance)}
        subTitle="Available Balance"
        Icon={UsersRound}
      />
      <AnalyticCard
        title={formatCurrency(userData?.wallet?.escrowBalance)}
        subTitle="Escrow Balance"
        Icon={UsersRound}
      />
    </div>
  );
};

export default CustomerWalletAnalytics;
