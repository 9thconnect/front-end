"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import AddProductModal from "@/components/modals/addProductModal";
import VendorProductTable from "@/components/tables/products/data-table";
import { Button } from "@/components/ui/button";
import { StatsSeller } from "@/type/users";
import { formatCurrency } from "@/utils/format-currency";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-stats-vendor-summary"],
    queryFn: () =>
      requests.get<{
        data: StatsSeller;
      }>("/vendor/summary"),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">My Shop</h3>
        {/* <Button>Add Product</Button> */}
        <AddProductModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AnalyticCard
          title={data?.data?.data?.shopStats.totalProducts || 0}
          subTitle="TOTAL PRODUCTS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(
            data?.data?.data?.shopStats.totalProductValue || 0
          )}
          subTitle="TOTAL VALUE"
          Icon={UsersRound}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        <AnalyticCard
          title={data?.data?.data?.orderStats.pendingOrders || 0}
          subTitle="PENDING ORDERS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data?.orderStats.receivedOrders || 0}
          subTitle="RECEIVED ORDERS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data?.orderStats.processingOrders || 0}
          subTitle="PROCESSING ORDERS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data?.orderStats.shippedOrders || 0}
          subTitle="SHIPPED ORDERS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data?.orderStats.deliveredOrders || 0}
          subTitle="DELIVERED ORDERS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={data?.data?.data?.orderStats.cancelledOrders || 0}
          subTitle="CANCELLED ORDERS"
          Icon={UsersRound}
        />
      </div>
      <div>
        <VendorProductTable />
      </div>
    </div>
  );
};

export default page;
