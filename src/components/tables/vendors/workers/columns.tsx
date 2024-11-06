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
import { Edit2, EyeIcon, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { ProfessionalData } from "@/type/professional";

export const renderStatus = (status: boolean) => {
  return (
    <MainBadge
      text={status ? "Approved" : "Not Approved"}
      type={status ? "green" : "red"}
    />
  );
};

export const columns: ColumnDef<ProfessionalData>[] = [
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
    accessorKey: "artisan.fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artisan" />
    ),
    cell: ({ row }) => {
      const artisan = row.original.artisan;
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={artisan.avatar} alt="Artisan avatar" />
            <AvatarFallback>{artisan.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{artisan.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "professionType.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession Type" />
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
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "professionApproved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => {
      return renderStatus(row.original.professionApproved);
    },
  },
  {
    accessorKey: "professionActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.original.professionActive;
      return (
        <MainBadge
          text={isActive ? "Active" : "Inactive"}
          type={isActive ? "green" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => <DateCell date={row.getValue("createdAt")} />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => <DateCell date={row.getValue("updatedAt")} />,
  },
  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full cursor-pointer">
          <EyeIcon color="#22bb36" />
        </div>
        <div className="flex items-center p-2 bg-[#F0D3D3] rounded-full cursor-pointer">
          <Trash2 color="#7B0A0A" />
        </div>
      </div>
    ),
  },
];
