"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import ActionCell from "@/components/common/actionCell";
import { navigate } from "@/app/actions";

// Define the Logistics data type based on your API response
export type LogisticsData = {
  _id: string;
  title: string;
  registration: string;
  details: string;
  logisticType: string;
  logisticSubType: string;
  capacity: number;
  fuelType: string;
  image: string;
  ratePerKg: number;
  ratePerKilometer: number;
  contact: {
    callNumber: string;
    whatsAppNumber: string;
  };
  vendor: {
    _id: string;
    fullName: string;
    vendorID: string;
  };
  marketedBy: {
    _id: string;
    shopName: string;
    shopCity: string;
    shopID: string;
    businessLegalName: string;
    businessLogo: string;
  };
  createdAt: Date;
  updatedAt: string;
};

export const renderType = (type: string) => {
  let badgeType;
  switch (type) {
    case "road":
      badgeType = "green";
      break;
    case "air":
      badgeType = "blue";
      break;
    case "water":
      badgeType = "orange";
      break;
    default:
      badgeType = "gray";
  }

  return <MainBadge text={type} type={badgeType as any} />;
};

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
    accessorKey: "logistics",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logistics" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.image}
              alt="logistics image"
            />
            <AvatarFallback>{row.original.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "registration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.registration}</p>;
    },
  },
  {
    accessorKey: "logisticType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return renderType(row.original.logisticType);
    },
  },
  {
    accessorKey: "logisticSubType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub Type" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.logisticSubType}</p>;
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.capacity} kg</p>;
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
    accessorKey: "marketedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marketed By" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.marketedBy.shopName}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.original.createdAt} />;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => "",
    cell: ({ row }) => navigate(`/dashboard/fleets/${row.original._id}`),
  },
];
