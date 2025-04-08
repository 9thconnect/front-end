"use client";

import React, { useState } from "react";
import { columns, renderStatus } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Project } from "@/type/professional";
import { useQuery } from "@tanstack/react-query";
import FilterSelect from "@/components/common/filterSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/common";
import { getProjects } from "@/lib/requests/user/bidding";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ProjectTable = () => {
  const [rowData, setRowData] = useState<Project | undefined>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const handleRowClick = (e: Project) => {
    setRowData(e);
    setOpen(true);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["projects-customer", pageIndex, pageSize],
    queryFn: () => getProjects(pageIndex + 1),
  });

  const totalPages = data?.data?.data?.pages ?? 0;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
    }
  };

  function onClose() {
    setOpen(false);
  }

  return (
    <div>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        dismissible
        onClose={onClose}
        direction="right"
      >
        <DrawerContent className="max-w-[425px] h-full ml-auto border flex flex-col">
          <DrawerHeader className="sticky top-0 bg-white z-10 pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                  <X size={20} />
                </DrawerClose>
                <DrawerTitle className="font-thin text-offBlack">
                  Project Details
                </DrawerTitle>
              </div>
              <Button
                onClick={() => router.push(`/account/projects/${rowData?._id}`)}
                className="rounded-xl"
              >
                View
              </Button>
            </div>
          </DrawerHeader>

          {rowData && (
            <div className="flex-grow overflow-y-auto px-3 mt-4 pt-10 pb-20">
              {/* Project details rendering similar to previous implementation */}
              <div className="p-4 rounded-lg mb-10 relative border text-center">
                <div className="mt-3">
                  <p className="text-3xl font-bold text-offBlack my-3">
                    {formatCurrency(rowData.approvedPrice)}
                  </p>
                  {/* <p>Status: {rowData.status}</p> */}

                  {renderStatus(rowData.status)}
                </div>
              </div>

              <div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Customer</p>
                  <div className="flex flex-col items-end">
                    <img
                      src={rowData.customer.avatar}
                      alt={`${rowData.customer.fullName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{rowData.customer.fullName}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Professional</p>
                  <div className="flex flex-col items-end">
                    <img
                      src={rowData.professional.avatar}
                      alt={`${rowData.professional.fullName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{rowData.professional.fullName}</p>
                    <p>{rowData.professional.vendorID}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Profession</p>
                  <div className="flex flex-col items-end">
                    <p>{rowData.profession.professionName}</p>
                    <p>{rowData.profession.profession}</p>
                    <p>{rowData.profession.professionID}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Project ID</p>
                  <div className="flex flex-col items-end">
                    <p>{rowData.projectID}</p>
                  </div>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Project Description</p>
                  <p className="truncate max-w-[200px]">
                    {rowData.projectDescription}
                  </p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Start Date</p>
                  <p>{new Date(rowData.startedDate).toLocaleDateString()}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Approved Price</p>
                  <p>{formatCurrency(rowData.approvedPrice)}</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Expected Delivery</p>
                  <p>{rowData.expectedDelivery} days</p>
                </div>
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p>Payment</p>

                  <div className="flex flex-col items-end">
                    <p>{rowData.isPaid ? "Paid" : "Unpaid"}</p>

                    <p>{formatDate(rowData?.datePaid)}</p>
                    {rowData.payment && (
                      <>
                        <p>{rowData.payment.invoiceRef}</p>
                        <p>{rowData.payment.gateway}</p>
                      </>
                    )}
                    {rowData.gatewayFee && (
                      <p>{formatCurrency(rowData.gatewayFee)} gateway fee</p>
                    )}
                    {rowData.MCDFee && (
                      <p>{formatCurrency(rowData.MCDFee)} transaction fee</p>
                    )}
                    {rowData.professionalPay && (
                      <p>
                        {formatCurrency(rowData.professionalPay)} Professional
                        Payout
                      </p>
                    )}
                  </div>
                </div>
                {rowData.completedProject.length > 0 && (
                  <div className="border-b pb-5 mt-3">
                    <h3 className="mb-4">Project Assets</h3>

                    {rowData.completedProject.map((proj, index) => (
                      <div
                        key={`${index}-proj`}
                        className="border p-3 rounded-lg"
                      >
                        <div>
                          <p>Message:</p>
                          <p>{proj.message}</p>
                        </div>
                        <div className="mt-2">
                          <p>File Link</p>
                          <p className="text-wrap max-w-10">
                            {truncateText(proj.fileUrl, 50)}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p>File Name</p>
                          <p className="">{truncateText(proj.fileName, 50)}</p>
                        </div>
                        <div className="mt-2">
                          <p>File Type</p>
                          <p className="">{truncateText(proj.fileType, 50)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {rowData.status == "completed" && (
                  <div>
                    {rowData?.completedDate && (
                      <div className="border-b pb-5 mt-3 flex justify-between items-center">
                        <p>Completed At</p>
                        <p>{formatDate(rowData.completedDate)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-2 px-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="border rounded-t-xl py-8 px-4">
            <p className="text-xl text-offBlack">Projects</p>
          </div>
          <DataTable
            columns={columns}
            data={data?.data?.data.projects ?? []}
            rowClick={handleRowClick}
            pageCount={totalPages}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
