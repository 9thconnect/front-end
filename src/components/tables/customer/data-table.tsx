"use client";

import React, { useState } from "react";
import { columns, CustomerData } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";

const CustomerTable = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");

  const query = useQuery({
    queryKey: ["get-customers", pageIndex, pageSize, searchTerm],
    queryFn: () =>
      requests.get<{
        data: {
          page: number;
          pages: number;
          count: number;
          customers: CustomerData[];
        };
      }>(
        `/customer/all-customers?search=${searchTerm}&pageNumber=${
          pageIndex + 1
        }`
      ),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageIndex(0); // Reset to first page when searching
  };

  return (
    <div>
      <div className="mt-5">
        <div className="border rounded-t-xl py-4 px-4">
          <div className="md:flex flex-wrap justify-between items-center">
            <Input
              type="text"
              placeholder="Search customers..."
              className="md:max-w-60 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="md:flex md:space-x-2">
              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Status"
                  options={[
                    { name: "Active", value: "active" },
                    { name: "Inactive", value: "inactive" },
                  ]}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        {query.isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            Loading...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={query.data?.data?.data.customers || []}
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

export default CustomerTable;
