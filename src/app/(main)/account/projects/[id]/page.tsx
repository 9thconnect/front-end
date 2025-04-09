"use client";

import MainBadge from "@/components/badges/mainBadge";
import AnalyticCard from "@/components/cards/common/analyticCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format-currency";
import { ArrowLeft, HandCoins, Handshake, Landmark } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import requests from "@/utils/requests";
import { completeProject } from "@/lib/requests/vendor/bidding";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/common/FileUpload";
import { useAppSelector } from "@/lib/redux/hooks";
import { UserType } from "@/lib/redux/features/auth/authSlice";

// Project interface
interface Project {
  requestExtension: {
    originalDate: string | null;
    newDate: string | null;
    days: number;
    reason: string;
  };
  _id: string;
  customer: { _id: string; fullName: string; avatar: string };
  professional: {
    _id: string;
    fullName: string;
    vendorID: string;
    avatar: string;
  };
  profession: {
    _id: string;
    profession: string;
    professionName: string;
    professionID: string;
    price: number;
  };
  projectDescription: string;
  projectID: string;
  status: string;
  startedDate: string;
  approvedPrice: number;
  gatewayFee: number;
  MCDFee: number;
  professionalPay: number;
  isPaid: boolean;
  datePaid: string;
  payment?: {
    _id: string;
    invoiceRef: string;
    payerName: string;
    gateway: string;
    status: string;
  };
  escrow: string;
  offer: string;
  expectedDelivery: number;
  deliveryDate: string;
  extendedDeliveryDate: boolean;
  completedProject: {
    message: string;
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileFormat: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  completedDate: string;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProjectPage = ({ params }: Props) => {
  const router = useRouter();
  const [isCompleteProjectDialogOpen, setIsCompleteProjectDialogOpen] =
    useState(false);
  const [completionNotes, setCompletionNotes] = useState("");

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

  const userType = useAppSelector((state) => state.auth.type);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => requests.get<Project>(`project/single/${params.id}`),
  });

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

      setIsCompleteProjectDialogOpen(false);
      setCompletionNotes("");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });

  const projectData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data || data.status === "error" || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {data?.message || "Project not found"}
      </div>
    );
  }
  const openCompleteProjectDialog = () => {
    setIsCompleteProjectDialogOpen(true);
  };

  const closeCompleteProjectDialog = () => {
    setIsCompleteProjectDialogOpen(false);
    setCompletionNotes("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
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
                  projectId: params.id,
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
      <div className="flex items-center space-x-3 mb-6">
        <Button
          className="rounded-full w-10 h-10 p-2 bg-white shadow hover:bg-gray-100"
          variant="ghost"
          onClick={() =>
            router.push(
              `${
                userType == UserType.VENDOR
                  ? "/account/projects"
                  : "/account/customer-projects"
              }`
            )
          }
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-semibold text-gray-800">
          Project Summary
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              {projectData.projectDescription}
            </h2>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <MainBadge
                  text={projectData.status}
                  type={projectData.status === "completed" ? "green" : "blue"}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Project ID:</span>
                <span className="text-gray-800">{projectData.projectID}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span className="text-gray-800">
                  {new Date(projectData.startedDate).toLocaleDateString()}
                </span>
              </div>
              {projectData.completedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="text-gray-800">
                    {new Date(projectData.completedDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="text-gray-800">
                  {projectData.expectedDelivery} days
                </span>
              </div>
              {projectData.extendedDeliveryDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Extended Delivery:</span>
                  <span className="text-gray-800">
                    {new Date(projectData.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {projectData.status === "started" && (
              <div className="flex flex-col space-y-3 mt-5">
                {userType == UserType.VENDOR && (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={openCompleteProjectDialog}
                  >
                    Complete Project
                  </Button>
                )}

                <Button
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
                  onClick={() =>
                    router.push(`/hire/projects/${projectData._id}`)
                  }
                >
                  View Messages
                </Button>
              </div>
            )}
          </div>

          {/* Extension Request (if applicable) */}
          {projectData.requestExtension?.newDate && (
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Extension Request
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Date:</span>
                  <span className="text-gray-800">
                    {projectData.requestExtension.originalDate
                      ? new Date(
                          projectData.requestExtension.originalDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Date:</span>
                  <span className="text-gray-800">
                    {new Date(
                      projectData.requestExtension.newDate
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days:</span>
                  <span className="text-gray-800">
                    {projectData.requestExtension.days}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Reason:</span>
                  <span className="text-gray-800">
                    {projectData.requestExtension.reason}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnalyticCard
              title={formatCurrency(projectData.approvedPrice)}
              subTitle="Approved Price"
              Icon={Landmark}
              colorClass="bg-cyan-200"
              className="text-black "
            />
            <AnalyticCard
              title={formatCurrency(projectData.professionalPay)}
              subTitle="Professional Pay"
              Icon={HandCoins}
              colorClass="bg-orange-200"
              className="text-black"
            />
            <AnalyticCard
              title={formatCurrency(
                projectData.gatewayFee + projectData.MCDFee
              )}
              subTitle="Fees (Gateway + MCD)"
              Icon={Handshake}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Professional Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-800">
                  {projectData.professional.fullName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vendor ID:</span>
                <span className="text-gray-800">
                  {projectData.professional.vendorID}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profession:</span>
                <span className="text-gray-800">
                  {projectData.profession.professionName}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Client Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-800">
                    {projectData.customer.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">UID:</span>
                  <span className="text-gray-800">
                    {projectData.customer._id}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Payment Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-800">
                    {formatCurrency(projectData.approvedPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gateway Fee:</span>
                  <span className="text-gray-800">
                    {formatCurrency(projectData.gatewayFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MCD Fee:</span>
                  <span className="text-gray-800">
                    {formatCurrency(projectData.MCDFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <MainBadge
                    text={projectData.isPaid ? "Paid" : "Pending"}
                    type={projectData.isPaid ? "green" : "blue"}
                  />
                </div>
                {projectData.datePaid && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid On:</span>
                    <span className="text-gray-800">
                      {new Date(projectData.datePaid).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {projectData.payment && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payer Name:</span>
                      <span className="text-gray-800">
                        {projectData.payment.payerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <span className="text-gray-800">
                        {projectData.payment.status}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Completed Project Files (if any) */}
          {projectData.completedProject.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Completed Project Files
              </h2>
              <div className="space-y-3">
                {projectData.completedProject.map((file) => (
                  <div key={file._id} className="flex flex-col">
                    <div className="flex justify-between">
                      <span className="text-gray-600">File:</span>
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.fileName}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-800">{file.fileType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="text-gray-800">
                        {(file.fileSize / 1024).toFixed(2)} KB
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Message:</span>
                      <span className="text-gray-800">{file.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
