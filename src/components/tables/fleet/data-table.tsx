"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getFleets } from "@/lib/requests/vendor/fleet";
import { columns } from "./columns";

const LogisticsTable = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const query = useQuery({
    queryKey: ["get-fleets", pageIndex, pageSize],
    queryFn: () => getFleets("", pageIndex + 1),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;

  const logisticTypes = [
    { name: "Road", value: "road" },
    { name: "Air", value: "air" },
    { name: "Sea", value: "sea" },
  ];

  const logisticSubTypes = [
    { name: "Van", value: "van" },
    { name: "Cargo Airline", value: "cargoAirline" },
    // Add more subtypes as needed
  ];

  return (
    <div>
      <div className="mt-5">
        <div className="border rounded-t-xl py-4 px-4">
          <div className="md:flex flex-wrap justify-between items-center">
            <Input
              type="text"
              placeholder="Search"
              className="md:max-w-60 w-full"
            />
            <div className="md:flex md:space-x-2">
              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Type"
                  options={logisticTypes}
                  placeholder="Type"
                />
                <FilterSelect
                  label="Sub Type"
                  options={logisticSubTypes}
                  placeholder="Sub Type"
                />
                <FilterSelect
                  label="Status"
                  options={[]}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        {query.isLoading ? (
          <>Loading</>
        ) : (
          <DataTable
            columns={columns}
            data={query.data?.data?.data.logistics || []}
            pageCount={totalPages}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>
    </div>
  );
};

export default LogisticsTable;
