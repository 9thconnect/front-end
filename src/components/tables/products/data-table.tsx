"use client";

import React, { useState } from "react";
import { columns, renderStatus } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionals } from "@/lib/requests/admin/professional/admin-professional-requests";
import { fetchBusinesses } from "@/lib/requests/admin/seller/admin-seller-requests";
import { Business } from "@/type/professional";
import { fetchProductCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { Product } from "@/type/common";
import { getProducts } from "@/lib/requests/vendor/product";
import { Skeleton } from "@/components/ui/skeleton";

const VendorProductTable = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const query = useQuery({
    queryKey: ["get-products", pageIndex, pageSize],
    queryFn: () => getProducts("", pageIndex + 1),
  });

  const totalPages = query.data?.data?.data.pages ?? 0;

  const { data: productData, isLoading: isLoadingCat } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  console.log(query.data?.data);

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
                {productData?.data?.data && (
                  <FilterSelect
                    label="Category"
                    options={productData?.data?.data?.categories.map((cat) => ({
                      name: cat.title as string,
                      value: cat._id as string,
                    }))}
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
          <div className="space-y-4">
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
          <DataTable
            columns={columns}
            data={query.data?.data?.data.products || []}
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

export default VendorProductTable;
