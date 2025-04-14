"use client";

import React, { useState } from "react";
import { columns, PropertyData } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Property } from "@/type/property";
import requests from "@/utils/requests";

// Property fetch function using your pattern
export const getProperties = (
  search?: string,
  pageNumber?: number,
  filteredByPropertyType?: string,
  searchByLocation?: string,
  filteredByVendor?: string
) => {
  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      properties: PropertyData[];
    };
  }>(
    `real-estate/admin/all-property?search=${search || ""}&pageNumber=${
      pageNumber || ""
    }&filteredByPropertyType=${filteredByPropertyType || ""}&searchByLocation=${
      searchByLocation || ""
    } &filteredByVendor=${filteredByVendor || ""}`
  );
};

// Property types fetch function
export const fetchPropertyTypes = () => {
  return requests.get(`real-estate/admin/property-types`);
};

const PropertyTable = ({ vendor }: { vendor?: string }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  const query = useQuery({
    queryKey: [
      "get-properties",
      pageIndex,
      pageSize,
      search,
      propertyType,
      location,
      vendor,
    ],
    queryFn: () =>
      getProperties(search, pageIndex + 1, propertyType, location, vendor),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;
  const properties = query.data?.data?.data.properties ?? [];

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="border rounded-t-xl py-4 px-4">
          <div className="md:flex flex-wrap justify-between items-center">
            <Input
              type="text"
              placeholder="Search properties"
              className="md:max-w-60 w-full"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="md:flex md:space-x-2">
              <div className="md:flex md:space-x-2 items-center">
                <Input
                  type="text"
                  placeholder="Location"
                  className="md:max-w-40 w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {query.isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={properties}
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

export default PropertyTable;
