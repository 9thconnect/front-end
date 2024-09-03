"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Business } from "@/type/professional";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WorkersData = {
  id: string;
  name: string;
  earning: number;
  tasks: number;
  rating: number;
  status: "disabled" | "enabled";
};

export const renderStatus = (status: string) => {
  let el;
  switch (status) {
    case "enabled":
      el = <MainBadge text={status} type="green" />;
      break;
    case "disabled":
      el = <MainBadge text={status} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<WorkersData>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artisan" />
    ),
  },

  {
    accessorKey: "earning",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Earning" />
    ),
    cell: ({ row }) => {
      return formatCurrency(row.original.earning);
    },
  },

  {
    accessorKey: "tasks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tasks" />
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artisan Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status") as string;

      return renderStatus(status);
    },
  },

  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className=" flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full">
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
