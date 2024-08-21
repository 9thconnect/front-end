import React from "react";
import { columns, RevenueData } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const RevenueDataTable = ({ data }: { data: RevenueData[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RevenueDataTable;
