"use client";

import React from "react";
import AnalyticCard from "@/components/cards/common/analyticCard";
import { formatCurrency } from "@/utils/format-currency";
import { AlertCircle, BanknoteIcon, UsersRound } from "lucide-react";
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
  const { data: vendor } = useAppSelector((state) => state.auth);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["vendor-profile", vendor?._id],
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

  const escrowBalance = data?.data?.profile?.wallet?.escrowBalance ?? 0;
  const availableBalance = data?.data?.profile?.wallet?.availableBalance ?? 0;
  const totalInflow = data?.data?.profile?.wallet?.totalInflow ?? 0;
  const totalOutflow = data?.data?.profile?.wallet?.totalOutflow ?? 0;

  return (
    <div className="grid md:grid-cols-2 gap-4 items-center mt-4">
      <AnalyticCard
        title={formatCurrency(escrowBalance)}
        subTitle="Escrow Balance"
        Icon={BanknoteIcon}
        colorClass="bg-green-100"
      />
      <AnalyticCard
        title={formatCurrency(availableBalance)}
        subTitle="Available Balance"
        Icon={BanknoteIcon}
        colorClass="bg-blue-100"
      />
      <AnalyticCard
        title={formatCurrency(totalInflow)}
        subTitle="Total Inflow"
        Icon={BanknoteIcon}
        colorClass="bg-yellow-100"
      />
      <AnalyticCard
        title={formatCurrency(totalOutflow)}
        subTitle="Total Outflow"
        Icon={BanknoteIcon}
        colorClass="bg-red-100"
      />
    </div>
  );
};

export default VendorWalletAnalytics;
