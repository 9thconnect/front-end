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
import { Product } from "@/type/common";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductData = Product;

export const renderStatus = (status: boolean) => {
  let el;
  switch (status) {
    case true:
      el = <MainBadge text={"live"} type="green" />;
      break;
    case false:
      el = <MainBadge text={"disabled"} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<ProductData>[] = [
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
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.images[0]}
              alt="user pic"
            />
            <AvatarFallback>{row.original.name.charAt(2)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "numSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Sold" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.numSold} Units </p>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return formatCurrency(row.original.price);
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("date")} />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: boolean = row.getValue("status") as boolean;

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
