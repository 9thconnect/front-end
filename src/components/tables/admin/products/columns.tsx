"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheckBig, CircleOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Product } from "@/type/common";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ProductActionButton } from "./actionCell";

export type ProductData = Product;

const toggleProductStatus = async (
  productId: string,
  action: "enable" | "disable"
) => {
  try {
    await requests.patch(
      `/product/admin/enable-disable/${productId}/${action}`,
      {}
    );
  } catch (error) {
    console.error("Error toggling product status:", error);
  }
};

export const renderStatus = (status: boolean) => {
  let el;
  switch (status) {
    case true:
      el = <MainBadge text={"live"} type="green" />;
      break;
    case false:
      el = <MainBadge text={"disabled"} type="red" />;
      break;

    default:
      break;
  }

  return el;
};

export const columns: ColumnDef<ProductData>[] = [
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
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              src={row.original.images[0]}
              alt="user pic"
            />
            <AvatarFallback>{row.original.name.charAt(2)}</AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "numSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Sold" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.numSold} Units </p>;
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
    accessorKey: "prstockQuantityice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Quantity" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.stockQuantity} Units </p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("createdAt")} />;
    },
  },

  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: boolean = row.getValue("available") as boolean;

      return renderStatus(status);
    },
  },

  {
    accessorKey: "action",
    header: () => "",
    cell: ({ row }) => (
      <ProductActionButton
        productId={row.original._id}
        disabled={row.original.disabled}
      />
    ),
  },
];
