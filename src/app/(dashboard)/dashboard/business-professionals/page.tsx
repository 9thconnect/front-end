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
      </div>

      <ProfessionalBusinessesDataTable />
    </div>
  );
};

export default page;
