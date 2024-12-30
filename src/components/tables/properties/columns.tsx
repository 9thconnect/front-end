"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import ActionCell from "@/components/common/actionCell";
import { Property } from "@/type/property";
import ActionCellProperty from "@/components/common/actionCellProperty";

export type PropertyData = Property;

export const columns: ColumnDef<PropertyData>[] = [
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
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.images[0]}
              alt="property pic"
            />
            <AvatarFallback>{row.original.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.title}</p>
        </div>
      );
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
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.location.address}</p>
          <p className="text-sm text-gray-500">
            {row.original.location.state}, {row.original.location.country}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => {
      const details = row.original.details;
      return (
        <div>
          <p>
            {details.bedroom} Bedrooms, {details.bathroom} Bathrooms
          </p>
          <p className="text-sm text-gray-500">
            {details.toilet} Toilet, {details.sittingRoom} Living Room
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "marketedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.marketedBy.shopName}</p>
          <p className="text-sm text-gray-500">
            {row.original.marketedBy.shopCity}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listed Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => <ActionCellProperty row={row} />,
  },
];
