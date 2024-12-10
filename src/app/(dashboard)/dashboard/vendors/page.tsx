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
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid md:grid-cols-4 gap-5 mt-6">
          <div className="md">
            <AnalyticCard title="2000" subTitle="TOTAL" Icon={Users} />
          </div>
          <div className="">
            <AnalyticCard title="30" subTitle="NEW" Icon={Users} />
          </div>
          <div className="">
            <AnalyticCard title="1500" subTitle="VERIFIED" Icon={Users} />
          </div>
          <div className="">
            <AnalyticCard title="150" subTitle="ARCHIVED" Icon={Users} />
          </div>
        </div>
      </Suspense>
      <VendorDataTable />
    </div>
  );
};

export default page;
