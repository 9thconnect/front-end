import AnalyticCard from "@/components/cards/common/analyticCard";
import AdminProductTable from "@/components/tables/admin/products/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Products on 9th</h3>
      </div>
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          title="50"
          subTitle="ALL ITEMS/PRODUCTS"
          Icon={UsersRound}
        />
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="TOTAL VALUE"
          Icon={UsersRound}
        />
      </div>
      <div>
        <AdminProductTable />
      </div>
    </div>
  );
};

export default page;
