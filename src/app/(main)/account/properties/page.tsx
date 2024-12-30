import AnalyticCard from "@/components/cards/common/analyticCard";
import AddPropertyModal from "@/components/modals/addProperty";
import VendorProductTable from "@/components/tables/products/data-table";
import VendorPropertiesTable from "@/components/tables/properties/data-table";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-offBlack my-2">My Properties</h3>

          <AddPropertyModal />
        </div>
        <div>
          <VendorPropertiesTable />
        </div>
      </div>
    </div>
  );
};

export default page;
