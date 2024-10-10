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
import { Profession, ProfessionalData } from "@/type/professional";
import { navigate } from "@/app/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const renderStatus = (status: boolean) => {
  let el;
  switch (status) {
    case true:
      el = <MainBadge text="Approved" type="green" />;
      break;
    case false:
      el = <MainBadge text="Not Approved" type="red" />;
      break;

    default:
      break;
  }

  return el;
};

const handleRowClick = (id: string) => {
  navigate(`professionals/${id}`);
};

export const columns: ColumnDef<Profession>[] = [
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
    accessorKey: "vendor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Professional" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={row.original.vendor.avatar} alt="user pic" />
            <AvatarFallback>
              {row.original.vendor.fullName.charAt(2)}
            </AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.vendor.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "vendor.vendorID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor ID" />
    ),
  },
  {
    accessorKey: "vendor.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "professionType.profession",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession Type" />
    ),
  },
  {
    accessorKey: "profession",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession" />
    ),
  },
  {
    accessorKey: "professionName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession Name" />
    ),
  },
  {
    accessorKey: "professionDesc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession Description" />
    ),
  },
  {
    accessorKey: "professionCity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession City" />
    ),
  },
  {
    accessorKey: "professionID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession ID" />
    ),
  },
  {
    accessorKey: "professionApproved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => {
      const status = row.original.professionApproved;

      return renderStatus(status);
    },
  },
  {
    accessorKey: "professionActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <MainBadge
          text={row.original.professionActive ? "Active" : "Inactive"}
          type={row.original.professionActive ? "green" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("updatedAt")} />;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div
            onClick={() => handleRowClick(row.original._id)}
            className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full cursor-pointer"
          >
            <EyeIcon color="#22bb36" />
          </div>
        </div>
      );
    },
  },
];
