"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Logistics } from "@/type/logistics"; // You'll need to create this type file
import ActionCellLogistics from "@/components/common/actionCellLogistic"; // You'll need to create this component

export type LogisticsData = Logistics;

export const columns: ColumnDef<LogisticsData>[] = [
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
    accessorKey: "vehicle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.image}
              alt="logistics pic"
            />
            <AvatarFallback>{row.original.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p>{row.original.title}</p>
            <p className="text-sm text-gray-500">{row.original.registration}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.logisticType}</p>
          <p className="text-sm text-gray-500">
            {row.original.logisticSubType}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.capacity} kg</p>
          <p className="text-sm text-gray-500">{row.original.fuelType}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rates" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{formatCurrency(row.original.ratePerKg)}/kg</p>
          <p className="text-sm text-gray-500">
            {formatCurrency(row.original.ratePerKilometer)}/km
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.vendor.fullName}</p>
          <p className="text-sm text-gray-500">
            {row.original.vendor.vendorID}
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
    cell: ({ row }) => <ActionCellLogistics row={row} />,
  },
];
