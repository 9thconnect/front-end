"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Admin } from "@/type/common";
import requests from "@/utils/requests";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { columns } from "./columns";
import FilterSelect from "@/components/common/filterSelect";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AdminForm, { AdminSchema } from "@/components/forms/admin/admin";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";

const AdminsTable = () => {
  const [rowData, setRowData] = useState<Admin | undefined>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const queryClient = useQueryClient();

  const handleRowClick = (e: Admin) => {
    setRowData(e);
    // setOpen(true);
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: [
      "get-admins",
      {
        pageIndex,
        pageSize,
        filteredByRole: roleFilter,
        search,
      },
    ],
    queryFn: () =>
      requests.get<{
        page: number;
        pages: number;
        count: number;
        data: {
          admins: Admin[];
        };
      }>(
        `admin/all-admins?search=${search}&pageNumber=${pageIndex + 1}${
          roleFilter && roleFilter !== "all"
            ? `&filteredByRole=${roleFilter}`
            : ""
        }`
      ),
  });

  const totalPages = data?.data?.pages ?? 0;

  console.log(data?.data?.data.admins);

  const handleSubmit = async (data: z.infer<typeof AdminSchema>) => {
    // Handle form submission, e.g. send data to server
    try {
      const res = await requests.post(`admin/add-admin`, {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
      });

      queryClient.invalidateQueries({
        queryKey: [
          `get-admins`,
          {
            page,
            filteredByRole: roleFilter,
            search,
          },
        ],
      });

      toast.success(res.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
        // Just a stock error
      }
    }
    console.log(data);
  };

  const handleClose = (close: boolean) => setIsOpen(close);

  return (
    <div>
      {isError && (
        <div>
          <p>{error.message}</p>
        </div>
      )}

      <div className="mt-5">
        <div className="border rounded-t-xl py-4 px-4">
          <div className="md:flex flex-wrap justify-between items-center">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="md:max-w-60 w-full"
            />
            <div className="md:flex md:space-x-2">
              <Sheet onOpenChange={handleClose} open={isOpen}>
                <SheetTrigger>
                  <Button>Add Admin</Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Add Admin </SheetTitle>
                    <AdminForm
                      onClose={() => setIsOpen(false)}
                      onSubmit={handleSubmit}
                    />
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <div className="md:flex md:space-x-2 items-center">
                <FilterSelect
                  label="Role"
                  options={[
                    {
                      name: "All",
                      value: "all",
                    },
                    {
                      name: "Super Admin",
                      value: "superAdmin",
                    },
                    {
                      name: "Product",
                      value: "product",
                    },
                    {
                      name: "Order",
                      value: "order",
                    },
                    {
                      name: "Accounting",
                      value: "accounting",
                    },
                    {
                      name: "Diplomacy",
                      value: "diplomacy",
                    },
                  ]}
                  state={[roleFilter, setRoleFilter]}
                  placeholder="Roles"
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {/* Repeat this block for the number of rows you want to display as loading */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 py-2 px-4"
              >
                {/* Table columns loader */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
                <Skeleton className="h-6 w-full" /> {/* First Column */}
              </div>
            ))}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data?.data?.data.admins || []}
            pageCount={totalPages}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>
    </div>
  );
};

export default AdminsTable;
