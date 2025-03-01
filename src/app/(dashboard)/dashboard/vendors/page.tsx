import AnalyticCard from "@/components/cards/common/analyticCard";
import VendorDataTable from "@/components/tables/vendors/data-table";
import { Button } from "@/components/ui/button";
import LogoIconComp from "@/icons/logoIcon";
import PeopleIconComponent from "@/icons/peopleIcon";
import { Users } from "lucide-react";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Vendors</p>
      </div>

      <VendorDataTable />
    </div>
  );
};

export default page;
