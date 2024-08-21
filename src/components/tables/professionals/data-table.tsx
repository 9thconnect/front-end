"use client";

import React, { useState } from "react";
import { columns, renderStatus, ProfessionalData } from "./columns";
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
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionals } from "@/lib/requests/admin/professional/admin-professional-requests";

const ProfessionalDataTable = ({ data }: { data: ProfessionalData[] }) => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["get-professionals"],
    queryFn: () => fetchProfessionals({ search: "" }),
  });

  console.log(query.data);

  const handleRowClick = (e: ProfessionalData) => {
    router.push(`professionals/${e.id}`);
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
        <DataTable columns={columns} data={data} rowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default ProfessionalDataTable;
