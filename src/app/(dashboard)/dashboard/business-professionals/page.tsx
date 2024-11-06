import AnalyticCard from "@/components/cards/common/analyticCard";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import ProfessionalBusinessesDataTable from "@/components/tables/businesses/data-table";
import ProfessionalDataTable from "@/components/tables/professionals/data-table";
import { Button } from "@/components/ui/button";
import { UsersRoundIcon } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Professional Businesses</p>
        <div className="sm:flex flex-wrap sm:flex-nowrap">
          <Button className="w-full sm:w-fit mt-2 sm:mt-0 font-normal">
            Download
          </Button>
        </div>
      </div>
      <div className="mt-5 rounded-lg border p-3">
        <div className="flex justify-between items-center">
          <p className="text-offBlack">Analysis</p>
          <DatePickerWithRange />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
          <div className="md">
            <AnalyticCard
              title="5,000"
              subTitle="TOTAL"
              Icon={UsersRoundIcon}
            />
          </div>
          <div className="">
            <AnalyticCard title="3,000" subTitle="NEW" Icon={UsersRoundIcon} />
          </div>
          <div className="">
            <AnalyticCard
              title="2,500"
              subTitle="VERIFIED"
              Icon={UsersRoundIcon}
            />
          </div>
          <div className="">
            <AnalyticCard
              title="300"
              subTitle="ARCHIVED"
              Icon={UsersRoundIcon}
            />
          </div>
        </div>
      </div>

      <ProfessionalBusinessesDataTable />
    </div>
  );
};

export default page;
