"use client";

import React, { useState } from "react";
import { columns, renderStatus, WorkersData } from "./columns";
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

const WorkerDataTable = ({ data }: { data: WorkersData[] }) => {
  const [rowData, setRowData] = useState<WorkersData | undefined>();
  const [open, setOpen] = useState(false);

  const handleRowClick = (e: WorkersData) => {
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
                  label="Status"
                  options={[
                    {
                      name: "Disabled",
                      value: 1,
                    },
                    {
                      name: "Enabled",
                      value: 0,
                    },
                  ]}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} rowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default WorkerDataTable;
