"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseBusiness,
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/chat/chatWindow";
import ChatInput from "@/components/chat/chatInput";
import CompleteProjectModal from "@/components/modals/completeProject";
import requests from "@/utils/requests";
import { useAppSelector } from "@/lib/redux/hooks";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import ProjectChat from "@/components/chat/projectChat";
import RateProjectModal from "@/components/modals/rateProfession";

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
  payment: {
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

const SingleProjectPage = ({ id }: { id: string }) => {
  const userType = useAppSelector((state) => state.auth.type);

  const { data: projectData, isLoading: isLoadingProj } = useQuery({
    queryKey: ["project", id],
    queryFn: () => requests.get<Project>(`project/single/${id}`),
  });

  if (isLoadingProj) return <div>Loading...</div>;

  if (!projectData) return <div>Error Loading Project</div>;

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <Breadcrumb className="my-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/marketplace">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary capitalize">
                {projectData.data?.professional.fullName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex space-x-3 items-center">
          {projectData.data?.profession._id && (
            <RateProjectModal professionId={projectData.data?.profession._id} />
          )}
        </div>
      </div>

      <SectionContainer>
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          {projectData && projectData.data && (
            <aside className="md:self-start md:sticky md:col-span-3 md:top-56 text-[#05141B]">
              <img
                src={projectData.data.professional.avatar}
                alt={projectData.data.professional.fullName}
                className="rounded-lg w-full h-auto"
              />
              <div className="mt-8">
                <div className="justify-between flex">
                  <p>{projectData.data.profession.professionName}</p>
                  <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                    <ShieldCheck size={15} />
                    <p className="text-sm">Verified</p>
                  </div>
                </div>
                <h2 className="text-3xl text-black mt-3">
                  {projectData.data.professional.fullName}
                </h2>
                <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
                  <div className="flex items-center">
                    <MapPin size={20} className="text-red-500" />
                    <span className="ml-2">
                      {projectData.data.professional.vendorID}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star size={20} className="text-red-500" />
                    <span className="ml-2">
                      Project ID: {projectData.data.projectID}
                    </span>
                  </div>
                </div>

                <h2 className="my-3 text-xl">Project Rate</h2>
                <div className="border rounded-lg px-4 py-4">
                  ₦ {projectData.data.approvedPrice.toLocaleString()}
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      Status:{" "}
                      <span className="capitalize">
                        {projectData.data.status}
                      </span>
                    </p>
                    <p>
                      Start Date:{" "}
                      {new Date(
                        projectData.data.startedDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      Expected Delivery:{" "}
                      {new Date(
                        projectData.data.deliveryDate
                      ).toLocaleDateString()}
                    </p>
                    {projectData.data.completedDate && (
                      <p>
                        Completed:{" "}
                        {new Date(
                          projectData.data.completedDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div className="md:col-span-5 mt-10 md:mt-0">
            <ProjectChat projectId={id} userType={userType} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <SectionCardHeader
          title={"Similar Professionals"}
          linkUrl={"/hire/home"}
          linkText="See more"
        />
      </SectionContainer>
    </div>
  );
};

export default SingleProjectPage;
