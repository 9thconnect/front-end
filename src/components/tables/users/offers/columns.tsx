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
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Proposal } from "@/type/professional";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const renderStatus = (status: string) => {
  let el;
  switch (status) {
    case "pending":
      el = <MainBadge text={status} type="grey" />;
      break;
    case "accepted":
      el = <MainBadge text={status} type="green" />;
      break;
    case "rejected":
      el = <MainBadge text={status} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<Proposal>[] = [
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
    accessorKey: "profession",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={row.original.professional.avatar}
              alt="user pic"
            />
            <AvatarFallback>
              {row.original.professional.fullName.charAt(2)}
            </AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.professional.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "offeredDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offer Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.original.offeredDate} />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return renderStatus(row.original.status);
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return formatCurrency(row.original.proposedPrice);
    },
  },
];
