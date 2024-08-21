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
import { EyeIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderData = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  customerName: string;
  date: Date;
  customerPhoto?: string;
  amount: number;
  orderId: string;
};

export const renderStatus = (status: string) => {
  let el;
  switch (status) {
    case "pending":
      el = <MainBadge text={status} type="grey" />;
      break;
    case "processing":
      el = <MainBadge text={status} type="blue" />;
      break;
    case "success":
      el = <MainBadge text={status} type="green" />;
      break;
    case "failed":
      el = <MainBadge text={status} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<OrderData>[] = [
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
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
  },

  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={row.original.customerPhoto} alt="user pic" />
            <AvatarFallback>
              {row.original.customerName.charAt(2)}
            </AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.customerName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return formatCurrency(row.original.amount);
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
      const status: string = row.getValue("status") as string;

      return renderStatus(status);
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;

      return formatCurrency(amount);
    },
  },

  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full">
            <EyeIcon color="#8E7E7E" />
          </div>
        </div>
      );
    },
  },
];
