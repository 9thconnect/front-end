"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DateCell from "@/components/common/dateCell";
import MainBadge from "@/components/badges/mainBadge";
import { Admin } from "@/type/common";
import ActionCell from "./actionCell";

// Define the Admin type based on the provided data structure

// Define columns for the admin data table
export const columns: ColumnDef<Admin>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <p className="font-medium">{row.getValue("fullName")}</p>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <p className="text-sm">{row.getValue("username")}</p>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <p className="text-sm">{row.getValue("email")}</p>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as Admin["role"];
      return (
        <MainBadge
          type={role === "superAdmin" ? "blue" : "green"}
          text={role}
        />
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <MainBadge
          type={isActive ? "green" : "red"}
          text={isActive ? "Active" : "Inactive"}
        />
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <p className="text-sm">{row.getValue("phone")}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },
  {
    accessorKey: "lastSeen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Seen" />
    ),
    cell: ({ row }) => {
      const lastSeen = row.getValue("lastSeen");
      return lastSeen ? <DateCell date={lastSeen as Date} /> : <p>-</p>;
    },
  },

  {
    accessorKey: "Action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return <ActionCell row={row.original} />;
    },
  },
];
