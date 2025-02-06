"use client";

import React, { useState } from "react";
import { columns, renderStatus } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ReceiptText, X } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Input } from "@/components/ui/input";
import FilterSelect from "@/components/common/filterSelect";
import { ProfessionalData } from "@/type/professional";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { Skeleton } from "@/components/ui/skeleton";

const WorkerDataTable = () => {
  const [rowData, setRowData] = useState<ProfessionalData | undefined>();
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const handleRowClick = (e: ProfessionalData) => {
    setRowData(e);
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
    }
  };

  function onClose() {
    setOpen(false);
  }

  const query = useQuery({
    queryKey: ["get-company-workers", pageIndex, pageSize],
    queryFn: () =>
      requests.get<{
        page: number;
        pages: number;
        count: number;
        professions: ProfessionalData[];
      }>(`vendor/my-professions?pageNumber=${pageIndex + 1}`),
  });

  const totalPages = query.data?.data?.pages ?? 0;

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

              <Button className=" w-full md:w-fit">Add User</Button>
            </div>
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
          query.data?.data?.professions && (
            <DataTable
              columns={columns}
              data={query.data?.data?.professions}
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

export default WorkerDataTable;
