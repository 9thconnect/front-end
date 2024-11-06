"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Order, OrderItem } from "@/type/common";

// Define the Order type based on the provided data structure

// Render order status
export const renderStatus = (status: Order["status"]) => {
  let el;
  switch (status) {
    case "delivered":
      el = <MainBadge text={status} type="green" />;
      break;
    case "cancelled":
      el = <MainBadge text={status} type="red" />;
      break;
    case "pending":
      el = <MainBadge text={status} type="grey" />;
      break;
    default:
      el = <MainBadge text="Unknown" type="grey" />;
      break;
  }
  return el;
};

// Define columns for the order data table
export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "orderID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <p className="font-medium">{row.getValue("orderID")}</p>,
  },
  {
    accessorKey: "orderItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      const items = row.getValue("orderItems") as OrderItem[];
      return (
        <div className="space-y-1">
          {items.map((item, index) => (
            <p key={index} className="text-sm">
              {item.quantity}x {item.name}
            </p>
          ))}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "orderDetails.totalPrice",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Total Amount" />
  //   ),
  //   cell: ({ row }) => {
  //     const amount = row.getValue("orderDetails.totalPrice") as number;
  //     return <p className="font-medium">{formatCurrency(amount)}</p>;
  //   },
  // },
  {
    accessorKey: "dateOrdered",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("dateOrdered")} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];
      return renderStatus(status);
    },
  },

  {
    accessorKey: "shippingAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Address" />
    ),
    cell: ({ row }) => {
      const address = row.getValue(
        "shippingAddress"
      ) as Order["shippingAddress"];
      return (
        <p className="text-sm">
          {address.address}, {address.city}, {address.state}, {address.country}
        </p>
      );
    },
  },
];
