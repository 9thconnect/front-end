import AnalyticCard from "@/components/cards/common/analyticCard";
import AddFleetModal from "@/components/modals/addFleet";
import AddPropertyModal from "@/components/modals/addProperty";
import LogisticsTable from "@/components/tables/fleet/data-table";
import VendorProductTable from "@/components/tables/products/data-table";
import VendorPropertiesTable from "@/components/tables/properties/data-table";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-offBlack my-2">My Fleet</h3>

          <AddFleetModal />
        </div>
        <div>
          <LogisticsTable />
        </div>
      </div>
    </div>
  );
};

export default page;
