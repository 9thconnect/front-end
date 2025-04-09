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

  console.log("projectData", projectData);

  return (
    <div className="h-screen">
      {/* <SectionContainer> */}
      <ProjectChat projectId={id} userType={userType} />
      {/* </SectionContainer> */}
    </div>
  );
};

export default SingleProjectPage;
