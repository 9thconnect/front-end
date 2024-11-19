"use client";

import React from "react";
import AnalyticCard from "@/components/cards/common/analyticCard";
import { formatCurrency } from "@/utils/format-currency";
import { AlertCircle, UsersRound } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { IUser, IVendor } from "@/type/users";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AnalyticCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};

const VendorWalletAnalytics = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["vendor-profile"],
    queryFn: () => requests.get<{ profile: IVendor }>("vendor/my-profile"),
  });

  if (isLoading) {
    return (
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCardSkeleton />
        <AnalyticCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load wallet information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const totalAmountOwed = data?.data?.profile?.wallet?.totalAmountOwed ?? 0;
  const totalAmountReceived =
    data?.data?.profile?.wallet?.totalAmountReceived ?? 0;
  const totalWithdraw = data?.data?.profile?.wallet?.totalWithdraw ?? 0;

  return (
    <div className="flex space-x-3 items-center mt-4">
      <AnalyticCard
        title={formatCurrency(totalAmountOwed)}
        subTitle="Total Amount Owed"
        Icon={UsersRound}
      />
      <AnalyticCard
        title={formatCurrency(totalAmountReceived)}
        subTitle="Total Amount Received"
        Icon={UsersRound}
      />
      <AnalyticCard
        title={formatCurrency(totalWithdraw)}
        subTitle="Total Withdraw"
        Icon={UsersRound}
      />
    </div>
  );
};

export default VendorWalletAnalytics;
