"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Edit2, Trash2 } from "lucide-react";
import { Business } from "@/type/professional";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VendorData = Business;

export const renderStatus = (status: string) => {
  let el;
  switch (status) {
    case "pending":
      el = <MainBadge text={status} type="grey" />;
      break;
    case "processing":
      el = <MainBadge text={status} type="blue" />;
      break;
    case "approved":
      el = <MainBadge text={status} type="green" />;
      break;
    case "not approved":
      el = <MainBadge text={status} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<VendorData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={row.original.vendor?.avatar} alt="user pic" />
            <AvatarFallback>
              {row.original.vendor?.fullName.charAt(2)}
            </AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.vendor?.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "vendor.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.businessApproved
        ? "approved"
        : "not approved";

      return renderStatus(status);
    },
  },

  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full">
            <Edit2 color="#8E7E7E" />
          </div>
          <div className="flex items-center p-2 bg-[#F0D3D3] rounded-full">
            <Trash2 color="#7B0A0A" />
          </div>
        </div>
      );
    },
  },
];
