import AnalyticCard from "@/components/cards/common/analyticCard";
import AddProductModal from "@/components/modals/addProductModal";
import VendorProductTable from "@/components/tables/products/data-table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">My Shop</h3>
        {/* <Button>Add Product</Button> */}
        <AddProductModal />
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
        <VendorProductTable />
      </div>
    </div>
  );
};

export default page;
