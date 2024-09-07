"use client";

import React, { useState } from "react";
import { columns, renderStatus, VendorData } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionals } from "@/lib/requests/admin/professional/admin-professional-requests";
import { fetchBusinesses } from "@/lib/requests/admin/seller/admin-seller-requests";
import { Business } from "@/type/professional";

// function getDataVendors(): VendorData[] {
//   return Array.from({ length: 10 }, (_, i) => ({
//     id: `728ed52f-${i}`,
//     date: new Date(),
//     status: ["pending", "processing", "success", "failed"][
//       Math.floor(Math.random() * 4)
//     ] as "pending" | "processing" | "success" | "failed",
//     email: `user${i}@example.com`,
//     customerName: `Vendor ${i}`,
//     customerPhoto: `https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ERwQvLzCOxhut7YvIj6lVEY4s1a4xlDjNaL7VkptWvT~c~BDNzG2gLVlobqEFwouW-6kEjatmSUbB2uyEAnBdQS0wgOls5a0p0JoDNnTUWYvsQys3mhj2IlndFyEwkaIWV7d6wWDEqpjXFtrBC3Ni9hFlKW9lQpH5eeHjdTO1zIWPuTk~LtR6r2xB1S3GSzMI3fGveq4utQ1DrqzyzCo1Av82qz5bOJBpQV7d6EywqfL0-MwqPi6XYsQIQ5NIBmaoLaJup9Iv8cme7NjXhv5Lhht~mZAv5sOuhy3Ta1yyw2NkQhSQBZFrUTAuFzIAEzCWkm7X6yG5~eJG-WvPeXTNw__`,
//   }));
// }

const VendorDataTable = () => {
  const router = useRouter();

  // const data = getDataVendors();

  const query = useQuery({
    queryKey: ["get-businesses"],
    queryFn: () => fetchBusinesses({ search: "" }),
  });

  console.log(query.data?.data?.data.businesses);

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

              <Button className=" w-full md:w-fit">Add Vendor</Button>
            </div>
          </div>
        </div>
        {query.isLoading ? (
          <>Loading</>
        ) : (
          <DataTable
            columns={columns}
            data={query.data?.data?.data.businesses as Business[]}
            // rowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDataTable;
