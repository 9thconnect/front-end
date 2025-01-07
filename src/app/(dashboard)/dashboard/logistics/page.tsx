import AnalyticCard from "@/components/cards/common/analyticCard";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import ProfessionalBusinessesDataTable from "@/components/tables/businesses/data-table";
import LogisticBusinessesDataTable from "@/components/tables/logistics/data-table";
import ProfessionalDataTable from "@/components/tables/professionals/data-table";
import RealtorBusinessesDataTable from "@/components/tables/realtors/data-table";
import { Button } from "@/components/ui/button";
import { UsersRoundIcon } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Logistics Businesses</p>
      </div>
      <div className="mt-5 rounded-lg border p-3">
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

      <LogisticBusinessesDataTable />
    </div>
  );
};

export default page;
