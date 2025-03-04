"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { columns, LogisticsData } from "./columns";
import requests from "@/utils/requests";

// Replace with your actual API function
const getLogistics = async (
  search = "",
  pageNumber = 1,
  filteredByLogisticType = "",
  searchByLogisticSubType = "",
  searchByMarketedBy = "",
  filteredByVendor = ""
) => {
  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      logistics: LogisticsData[];
    };
  }>(
    `/logistic/admin/all-logistics?search=${search}&pageNumber=${pageNumber}${
      filteredByLogisticType
        ? `&filteredByLogisticType=${filteredByLogisticType}`
        : ""
    }${
      searchByLogisticSubType
        ? `&searchByLogisticSubType=${searchByLogisticSubType}`
        : ""
    }${searchByMarketedBy ? `&searchByMarketedBy=${searchByMarketedBy}` : ""}${
      filteredByVendor ? `&filteredByVendor=${filteredByVendor}` : ""
    }`
  );
};

// Replace with your actual API function

const LogisticsTable = ({ vendor }: { vendor?: string }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [logisticType, setLogisticType] = useState("");
  const [logisticSubType, setLogisticSubType] = useState("");
  const [marketedBy, setMarketedBy] = useState("");

  const query = useQuery({
    queryKey: [
      "admin-get-logistics",
      pageIndex,
      pageSize,
      search,
      logisticType,
      logisticSubType,
      marketedBy,
      vendor,
    ],
    queryFn: () =>
      getLogistics(
        search,
        pageIndex + 1,
        logisticType,
        logisticSubType,
        marketedBy,
        vendor
      ),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;
  const logistics = query.data?.data?.data.logistics ?? [];

  // Logistics type options
  const logisticTypeOptions = [
    { name: "Road", value: "road" },
    { name: "Air", value: "air" },
    { name: "Water", value: "water" },
  ];

  // Logistics sub-type options based on selected type
  const getSubTypeOptions = () => {
    switch (logisticType) {
      case "road":
        return [
          { name: "Van", value: "van" },
          { name: "Truck", value: "truck" },
          { name: "Motorcycle", value: "motorcycle" },
        ];
      case "air":
        return [
          { name: "Cargo Airline", value: "cargoAirline" },
          { name: "Passenger Airline", value: "passengerAirline" },
        ];
      case "water":
        return [
          { name: "Ship", value: "ship" },
          { name: "Boat", value: "boat" },
        ];
      default:
        return [];
    }
  };

  // Handle search input change
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
              placeholder="Search logistics"
              className="md:max-w-60 w-full"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="md:flex md:space-x-2">
              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Logistics Type"
                  options={logisticTypeOptions}
                  placeholder="Logistics Type"
                  state={[logisticType, setLogisticType]}
                />

                <FilterSelect
                  label="Sub Type"
                  options={getSubTypeOptions()}
                  placeholder="Sub Type"
                  disabled={!logisticType}
                  state={[logisticSubType, getSubTypeOptions]}
                />

                {/* {marketersData?.data?.data && (
                  <FilterSelect
                    label="Marketed By"
                    options={marketersData?.data?.data.map((marketer: any) => ({
                      name: marketer.shopName as string,
                      value: marketer._id as string,
                    }))}
                    placeholder="Marketed By"
                    value={marketedBy}
                    onChange={(value) => setMarketedBy(value)}
                  />
                )} */}

                {/* {vendorsData?.data?.data && (
                  <FilterSelect
                    label="Vendor"
                    options={vendorsData?.data?.data.map((vendor: any) => ({
                      name: vendor.fullName as string,
                      value: vendor._id as string,
                    }))}
                    placeholder="Vendor"
                    value={vendor}
                    onChange={(value) => setVendor(value)}
                  />
                )} */}
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
            data={logistics}
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
