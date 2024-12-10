import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import MainBadge from "@/components/badges/mainBadge";
import DateCell from "@/components/common/dateCell";
import { formatCurrency } from "@/utils/format-currency";
import { Project } from "@/type/professional";

export const renderStatus = (status: string) => {
  let el;
  switch (status) {
    case "started":
      el = <MainBadge text={status} type="blue" />;
      break;
    case "completed":
      el = <MainBadge text={status} type="green" />;
      break;
    case "cancelled":
      el = <MainBadge text={status} type="red" />;
      break;
    default:
      el = <MainBadge text={status} type="grey" />;
      break;
  }

  return el;
};

export const columns: ColumnDef<Project>[] = [
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
            <AvatarImage src={row.original.customer.avatar} alt="user pic" />
            <AvatarFallback>
              {row.original.customer.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="ml-3">{row.original.customer.fullName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "startedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Started Date" />
    ),
    cell: ({ row }) => {
      return <DateCell date={row.original.startedDate} />;
    },
  },
  {
    accessorKey: "profession",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profession" />
    ),
    cell: ({ row }) => {
      return row.original.profession.professionName;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return renderStatus(row.original.status);
    },
  },
  {
    accessorKey: "approvedPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return formatCurrency(row.original.approvedPrice);
    },
  },
];
