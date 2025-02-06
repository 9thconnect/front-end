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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { Project } from "@/type/professional";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects, completeProject } from "@/lib/requests/vendor/bidding";
import FilterSelect from "@/components/common/filterSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/common/FileUpload";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/common";

const ProjectTable = () => {
  const [rowData, setRowData] = useState<Project | undefined>();
  const [open, setOpen] = useState(false);
  const [isCompleteProjectDialogOpen, setIsCompleteProjectDialogOpen] =
    useState(false);
  const [completionNotes, setCompletionNotes] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const [completedProjectFiles, setCompletedProjectFiles] = useState<
    Array<{
      message: string;
      fileUrl: string;
      fileName?: string;
      fileType?: string;
      fileSize?: number;
      fileFormat?: string;
    }>
  >([]);

  const handleRowClick = (e: Project) => {
    setRowData(e);
    setOpen(true);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["projects", pageIndex, pageSize],
    queryFn: () => getProjects(pageIndex + 1),
  });

  const totalPages = data?.data?.data.pages ?? 0;

  const queryClient = useQueryClient();

  const completeProjectMutation = useMutation({
    mutationFn: (payload: {
      projectId: string;
      completedProject: Array<{
        message: string;
        fileUrl: string;
        fileName?: string;
        fileType?: string;
        fileSize?: number;
        fileFormat?: string;
      }>;
    }) => completeProject(payload),
    onSuccess: () => {
      toast("Project Completed", {
        description: "The project has been successfully completed.",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
      setIsCompleteProjectDialogOpen(false);
      setCompletionNotes("");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRowData(undefined);
      setOpen(false);
    }
  };

  function onClose() {
    setOpen(false);
  }

  const openCompleteProjectDialog = () => {
    setIsCompleteProjectDialogOpen(true);
  };

  const closeCompleteProjectDialog = () => {
    setIsCompleteProjectDialogOpen(false);
    setCompletionNotes("");
  };

  const handleCompleteProject = () => {
    if (!rowData) return;

    // completeProjectMutation.mutate({
    //   projectId: rowData._id,
    //   completionNotes: completionNotes,
    // });
  };

  const resetCompletionForm = () => {
    setCompletedProjectFiles([]);
    setCompletionNotes("");
  };

  const handleFileUpload = (uploadResult: {
    url: string;
    publicId: string;
    name: string;
    mimeType: string;
    fileSize: number;
    fileFormat: string;
  }) => {
    const newFile = {
      message: completionNotes, // Optional completion notes
      fileUrl: uploadResult.url,
      fileName: uploadResult.name,
      fileType: uploadResult.mimeType,
      fileSize: uploadResult.fileSize,
      fileFormat: uploadResult.fileFormat,
    };

    setCompletedProjectFiles((prevFiles) => [...prevFiles, newFile]);

    setCompletionNotes("");
  };

  return (
    <div>
      <div className="border rounded-t-xl py-4 px-4">
        <div className="md:flex flex-wrap justify-between items-center">
          <div className="md:flex md:space-x-2">
            <div className="md:flex md:space-x-2 items-center">
              <FilterSelect label="Status" options={[]} placeholder="Status" />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        dismissible
        onClose={onClose}
        direction="right"
      >
        <DrawerContent className="max-w-[425px] h-full ml-auto border flex flex-col">
          <DrawerHeader className="sticky top-0 bg-white z-10 pb-2">
            <div className="flex items-center">
              <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
                <X size={20} />
              </DrawerClose>
              <DrawerTitle className="font-thin text-offBlack">
                Project Details
              </DrawerTitle>
            </div>

            {rowData?.status === "started" && (
              <div className="flex w-full space-x-4 mt-3">
                <Button
                  className="w-full"
                  onClick={openCompleteProjectDialog}
                  disabled={completeProjectMutation.isPending}
                >
                  {completeProjectMutation.isPending
                    ? "Completing..."
                    : "Complete Project"}
                </Button>
              </div>
            )}
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

                    {rowData.completedProject.map((proj) => (
                      <div
                        key={`${proj.fileUrl}-eejjjd`}
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

      {rowData && (
        <Dialog
          open={isCompleteProjectDialogOpen}
          onOpenChange={closeCompleteProjectDialog}
        >
          <DialogContent className=" max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Complete Project</DialogTitle>
              <DialogDescription>
                Are you sure you want to mark this project as complete? You can
                upload multiple assets
              </DialogDescription>
            </DialogHeader>
            <div className="border border-dashed py-4 px-4 rounded-xl">
              <p>Upload Asset</p>
              <Textarea
                placeholder="What is the asset about"
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                className="mt-4"
              />
              <FileUpload
                disabled={completionNotes.length < 1}
                onUploadSuccess={handleFileUpload}
              />
            </div>

            {completedProjectFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2">Uploaded Files:</h4>
                {completedProjectFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <div className="text-white bg-black flex items-center justify-center rounded-full p-4 h-6 w-6">
                      {index + 1}
                    </div>
                    <span>{file.fileName}</span>
                    <button
                      onClick={() => {
                        // Remove file from the array
                        setCompletedProjectFiles((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                      }}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={closeCompleteProjectDialog}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  completeProjectMutation.mutate({
                    projectId: rowData._id, // Assuming you have this
                    completedProject: completedProjectFiles,
                  });
                }}
                disabled={completeProjectMutation.isPending}
              >
                {completeProjectMutation.isPending
                  ? "Completing..."
                  : "Complete Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
