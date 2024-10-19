"use client";

import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Payment } from "@/type/common"; // Assuming this is where the Payment type is defined
import { renderPaymentStatus } from "@/components/cards/common/renderPaymentStatus";

// Render payment status

// Define columns for the data table
export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "invoiceRef",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice Ref" />
    ),
    cell: ({ row }) => <p>{row.getValue("invoiceRef")}</p>,
  },
  {
    accessorKey: "payerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payer Name" />
    ),
    cell: ({ row }) => <p>{row.getValue("payerName")}</p>,
  },
  {
    accessorKey: "payerEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payer Email" />
    ),
    cell: ({ row }) => <p>{row.getValue("payerEmail")}</p>,
  },
  {
    accessorKey: "payerPhoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payer Phone" />
    ),
    cell: ({ row }) => <p>{row.getValue("payerPhoneNumber")}</p>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return formatCurrency(amount);
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.getValue("paymentDate")} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Payment["status"];
      return renderPaymentStatus(status);
    },
  },
];
