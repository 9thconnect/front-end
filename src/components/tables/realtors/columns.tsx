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
import { navigate } from "@/app/actions";
import { Business } from "@/type/professional";

// Function to render status badge
export const renderStatus = (status: boolean) => {
  return (
    <MainBadge
      text={status ? "Approved" : "Not Approved"}
      type={status ? "green" : "red"}
    />
  );
};

// Function to handle row click
const handleRowClick = (id: string) => {
  navigate(`realtors/${id}`);
};

// Define columns with the updated `Business` fields
export const columns: ColumnDef<Business>[] = [
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
    accessorKey: "businessLegalName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={row.original.businessLogo} alt="business logo" />
          <AvatarFallback>
            {row.original.businessLegalName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="ml-3">{row.original.businessLegalName}</p>
      </div>
    ),
  },
  {
    accessorKey: "shopName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Name" />
    ),
  },
  {
    accessorKey: "shopCity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop City" />
    ),
  },
  {
    accessorKey: "shopAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Address" />
    ),
  },
  {
    accessorKey: "shopID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop ID" />
    ),
  },
  {
    accessorKey: "businessType.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Type" />
    ),
  },
  {
    accessorKey: "businessDesc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Description" />
    ),
  },
  {
    accessorKey: "businessEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Email" />
    ),
  },
  {
    accessorKey: "businessPhoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "businessRegNo",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Business Registration No."
      />
    ),
  },
  {
    accessorKey: "businessApproved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => renderStatus(row.original.businessApproved),
  },
  {
    accessorKey: "businessActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => (
      <MainBadge
        text={row.original.businessActive ? "Active" : "Inactive"}
        type={row.original.businessActive ? "green" : "red"}
      />
    ),
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
        <div
          onClick={() => handleRowClick(row.original._id)}
          className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full cursor-pointer"
        >
          <EyeIcon color="#22bb36" />
        </div>
      </div>
    ),
  },
];
