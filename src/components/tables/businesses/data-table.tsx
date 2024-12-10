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

const ProfessionalBusinessesDataTable = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["get-professional-businesses", search],
    queryFn: () => fetchProfessionalBusinesses({ search: search }),
  });

  console.log(query.data?.data?.data.businesses);

  console.log(query.data);

  const handleRowClick = (e: Business) => {
    router.push(`business-professionals/${e.business}`);
    console.log(e);
  };

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
            {/* <div className="md:flex md:space-x-2">
              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Category"
                  options={[]}
                  placeholder="Category"
                />
                <FilterSelect
                  label="Status"
                  options={[]}
                  placeholder="Status"
                />
              </div>

              <Button className=" w-full md:w-fit">Add User</Button>
            </div> */}
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
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProfessionalBusinessesDataTable;
