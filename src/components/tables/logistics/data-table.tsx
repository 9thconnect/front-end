"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionalBusinesses } from "@/lib/requests/admin/professional/admin-professional-requests";
import { Business } from "@/type/professional";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRealtorBusinesses } from "@/lib/requests/admin/real-estate";
import { fetchLogisticsBusinesses } from "@/lib/requests/admin/logistics";

const LogisticBusinessesDataTable = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["get-logistics-businesses", search, pageIndex, pageSize],
    queryFn: () =>
      fetchLogisticsBusinesses({
        search: search,
        pageNumber: pageIndex + 1,
      }),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;

  console.log(query.data?.data?.data.businesses);

  console.log(query.data);

  return (
    <div>
      <div className="mt-5">
        <div className="border rounded-t-xl py-4 px-4">
          <div className="md:flex flex-wrap justify-between items-center">
            <Input
              type="text"
              placeholder="Search"
              className="md:max-w-60 w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {query.isLoading ? (
          <div className="space-y-4">
            {/* Repeat this block for the number of rows you want to display as loading */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 py-2 px-4"
              >
                {/* Table columns loader */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
              </div>
            ))}
          </div>
        ) : (
          query.data?.data?.data.businesses && (
            <DataTable
              columns={columns}
              data={query.data?.data?.data.businesses}
              pageCount={totalPages}
              pageSize={pageSize}
              pageIndex={pageIndex}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LogisticBusinessesDataTable;
