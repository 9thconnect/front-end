"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionals } from "@/lib/requests/admin/professional/admin-professional-requests";
import { fetchBusinesses } from "@/lib/requests/admin/seller/admin-seller-requests";
import { Business } from "@/type/professional";
import {
  fetchProductCategories,
  fetchPropertiesCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import { Product } from "@/type/common";
import { getProducts } from "@/lib/requests/vendor/product";
import { getProperties } from "@/lib/requests/vendor/property";

const VendorPropertiesTable = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["get-properties"],
    queryFn: () => getProperties(),
  });

  const { data: propertyData, isLoading: isLoadingCat } = useQuery({
    queryKey: ["property-category"],
    queryFn: () => fetchPropertiesCategories(),
  });

  console.log(propertyData);

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
                {propertyData?.data?.data && (
                  <FilterSelect
                    label="Category"
                    options={propertyData?.data?.data?.categories.map(
                      (cat) => ({
                        name: cat.title as string,
                        value: cat._id as string,
                      })
                    )}
                    placeholder="Category"
                  />
                )}

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
            data={query.data?.data?.data.properties || []}
          />
        )}
      </div>
    </div>
  );
};

export default VendorPropertiesTable;
