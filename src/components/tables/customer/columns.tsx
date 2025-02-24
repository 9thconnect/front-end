"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import DateCell from "@/components/common/dateCell";
import ActionCell from "@/components/common/actionCell";

// Define the shape of our customer data
export type CustomerData = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  savedProducts: any[];
  cart: any[];
  createdAt: string;
  lastSeen: string;
};

export const columns: ColumnDef<CustomerData>[] = [
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
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.avatar}
              alt="customer pic"
            />
            <AvatarFallback>{row.original.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.email}</p>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.phoneNumber}</p>;
    },
  },
  {
    accessorKey: "savedProducts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saved Items" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.savedProducts.length} items</p>;
    },
  },
  {
    accessorKey: "cart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cart Items" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.cart.length} items</p>;
    },
  },
  {
    accessorKey: "lastSeen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Seen" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("lastSeen")} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },
];
