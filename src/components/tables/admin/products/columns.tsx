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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

  // {
  //   accessorKey: "action",
  //   header: ({ column }) => "",
  //   cell: ({ row }) => {
  //     const productId = row.original._id;

  //     const handleToggleStatus = async () => {
  //       const action = row.getValue("disabled") ? "disable" : "enable";
  //       await toggleProductStatus(productId, action);
  //       // Here, refresh data or update the row's status based on API response
  //     };

  //     return row.getValue("disabled") ? (
  //       <Button className="rounded-3xl">
  //         Enable <CircleCheckBig className="ml-2" />
  //       </Button>
  //     ) : (
  //       <Button className="rounded-3xl">
  //         Disable <CircleOff className="ml-2" />
  //       </Button>
  //     );
  //   },
  // },

  {
    accessorKey: "action",
    header: () => "",
    cell: ({ row }) => {
      const productId = row.original._id;
      const disabled = row.original.disabled;

      console.log("disabled", row.original.disabled);

      const queryClient = useQueryClient();

      const toggleStatusMutation = useMutation({
        mutationFn: () =>
          toggleProductStatus(productId, !disabled ? "disable" : "enable"),
        onSuccess: () => {
          toast.success(
            `Product ${!disabled ? "disabled" : "enabled"} successfully`
          );
          // Invalidate the products query to refresh the table
          queryClient.invalidateQueries({ queryKey: ["get-products-admin"] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
          toast.error(
            error.response?.data.message || "Failed to toggle product status"
          );
        },
      });

      const handleToggleStatus = () => {
        toggleStatusMutation.mutate();
      };

      return (
        <Button
          className="rounded-3xl"
          onClick={handleToggleStatus}
          disabled={toggleStatusMutation.isPending}
        >
          {!disabled ? (
            <>
              Disable <CircleOff className="ml-2" />
            </>
          ) : (
            <>
              Enable <CircleCheckBig className="ml-2" />
            </>
          )}
          {toggleStatusMutation.isPending && " Processing..."}
        </Button>
      );
    },
  },
];
