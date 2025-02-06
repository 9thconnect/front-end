import React, { useState } from "react";
import { columns, RevenueData } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const RevenueDataTable = ({ data }: { data: RevenueData[] }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pageCount={0}
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default RevenueDataTable;
