"use client";

import React, { useEffect, useState } from "react";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Separator } from "@/components/ui/separator";
import { MapPin, ShieldCheck, Star } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SendProposalModal from "@/components/modals/sendProposalModal";
import { ProfessionalData } from "@/type/professional";
import { siteConfig } from "@/config/site.config";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { toggleNotCustomerModal } from "@/lib/redux/features/layout/layoutSlice";

const SingleTalentPage = ({ id }: { id: string }) => {
  const [professionalData, setProfessionalData] =
    useState<ProfessionalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const type = useAppSelector((state) => state.auth.type);

  const handleNoCustomer = () => {
    console.log("No customer");

    dispatch(toggleNotCustomerModal({ open: true }));
  };

  useEffect(() => {
    const fetchProfessionalData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${siteConfig.apiURL}/profession/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch professional data");
        }
        const data = await response.json();
        setProfessionalData(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionalData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!professionalData) return <div>No data available</div>;

  const {
    vendor,
    professionType,
    professionName,
    professionDesc,
    professionCity,
    price,
    portfolio,
    qualifications,
    professionApproved,
    professionID,
    profession,
  } = professionalData;

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/marketplace">Professionals</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {professionName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SectionContainer>
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <aside className="md:self-start md:sticky md:col-span-3 md:top-56 text-[#05141B]">
            <img
              src={vendor.avatar}
              alt={vendor.fullName}
              className="rounded-lg w-full"
            />
            <div>
              <h2 className="my-3">Professional Rate</h2>
              <div className="border rounded-lg px-4 py-4">
                ₦ {price.toLocaleString()}
              </div>
            </div>
          </aside>
          <div className="md:col-span-5 mt-10 md:mt-0">
            <div className="justify-between flex">
              <p>{professionType.title}</p>
              <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                <ShieldCheck size={20} />
                <p className="text-sm">
                  {professionApproved ? "Verified" : "Unverified"}
                </p>
              </div>
            </div>
            <h2 className="text-3xl text-black mt-3">{vendor.fullName}</h2>
            <p className="text-sm text-gray-600">ID: {vendor.vendorID}</p>
            <p className="text-sm text-gray-600">
              Profession ID: {professionID}
            </p>
            <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
              <div className="flex">
                <MapPin size={20} color="red" />
                <span className="ml-2">{professionCity}</span>
              </div>
              <div className="flex">
                <Star size={20} color="red" />
                <span className="ml-2">N/A</span>
              </div>
              <div className="flex">
                <Separator orientation="vertical" />
                <span className="ml-2">N/A reviews</span>
              </div>
            </div>
            <h2 className="mb-2 mt-6 text-offBlack">Overview</h2>
            <div className="border rounded-lg px-4 py-4 mb-4">
              {professionDesc}
            </div>
            <div className="border rounded-lg px-4 py-4">
              <p>
                <strong>Profession:</strong> {profession}
              </p>
              <p>
                <strong>Profession Name:</strong> {professionName}
              </p>
              <p>
                <strong>Description:</strong> {professionDesc}
              </p>
            </div>
            <h2 className="mb-2 mt-6 text-offBlack">Work Portfolio</h2>
            <div className="border rounded-lg px-4 py-4">
              {portfolio.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {portfolio.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Work ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <p>No portfolio items available</p>
              )}
            </div>
            <h2 className="my-3">Qualifications</h2>
            <div className="border rounded-lg px-4 pb-4">
              {qualifications.length > 0 ? (
                qualifications.map((qual, index) => (
                  <div key={index} className="flex justify-between [&>*]:mt-5">
                    <div>
                      <h4 className="">{qual.degree}</h4>
                      <p className="text-[#7C7C7C] text-xs">{qual.institute}</p>
                    </div>
                    <p>{qual.year}</p>
                  </div>
                ))
              ) : (
                <p className="mt-5">No qualifications listed</p>
              )}
            </div>
            <div className="mt-7 w-full">
              {type !== UserType.CUSTOMER ? (
                <Button onClick={handleNoCustomer} className="w-full">
                  Hire Professional
                </Button>
              ) : (
                <SendProposalModal id={id} />
              )}
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default SingleTalentPage;
