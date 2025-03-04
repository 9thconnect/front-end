"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { navigate } from "@/app/actions";
import { Button } from "@/components/ui/button";

// Define the Property data type based on your API response
export type PropertyData = {
  _id: string;
  title: string;
  description: string;
  price: number;
  amenities: string[];
  images: string[];
  propertyApproved: boolean;
  propertyActive: boolean;
  propertyPending: boolean;
  propertyRejected: boolean;
  details: {
    bedroom: number;
    bathroom: number;
    toilet: number;
    sittingRoom: number;
  };
  location: {
    state: string;
    country: string;
    address: string;
  };
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
  propertyType: {
    _id: string;
    title: string;
    image: string;
  };
  createdAt: Date;
  updatedAt: string;
};

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
              alt="property image"
            />
            <AvatarFallback>{row.original.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "propertyType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.propertyType.title}</p>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.location.address}</p>;
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
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => {
      const { bedroom, bathroom } = row.original.details;
      return (
        <p>
          {bedroom} bed, {bathroom} bath
        </p>
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
    cell: ({ row }) => (
      <Button
        onClick={() => navigate(`/dashboard/properties/${row.original._id}`)}
      >
        View
      </Button>
    ),
  },
];
