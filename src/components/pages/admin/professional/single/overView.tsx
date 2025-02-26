"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site.config";
import { ProfessionalData } from "@/type/professional";
import { MapPin, ShieldCheck, Star } from "lucide-react";
import { IVendor } from "@/type/users";

export const Overview = ({ vendor }: { vendor: IVendor }) => {
  const [professionalData, setProfessionalData] =
    useState<ProfessionalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profession = vendor?.professions ? vendor.professions[0] : null;

  // const {
  //   vendor,
  //   professionType,
  //   professionName,
  //   professionDesc,
  //   professionCity,
  //   price,
  //   portfolio,
  //   qualifications,
  //   professionApproved,
  //   professionID,
  //   profession,
  // } = professionalData;

  return (
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
            ₦ {profession?.price.toLocaleString()}
          </div>
        </div>
      </aside>
      <div className="md:col-span-5 mt-10 md:mt-0">
        <div className="justify-between flex">
          <p>{profession?.professionName}</p>
          {vendor.accountSuspend ? (
            <div className="rounded-2xl bg-red-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Account Suspended</p>
            </div>
          ) : profession?.professionApproved ? (
            <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Profession Verified</p>
            </div>
          ) : profession?.professionRejected ? (
            <div className="rounded-2xl bg-red-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Profession Rejected</p>
            </div>
          ) : profession?.professionPending ? (
            <div className="rounded-2xl bg-gray-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Profession Pending</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">unattended</p>
            </div>
          )}
        </div>
        <h2 className="text-3xl text-black mt-3">{vendor.fullName}</h2>
        <p className="text-sm text-gray-600">ID: {vendor.vendorID}</p>
        <p className="text-sm text-gray-600">
          Profession ID: {profession?.professionID}
        </p>
        <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
          <div className="flex">
            <MapPin size={20} color="red" />
            <span className="ml-2">{profession?.professionCity}</span>
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
          {profession?.professionDesc}
        </div>
        <div className="border rounded-lg px-4 py-4">
          <p>{/* <strong>Profession:</strong> {profession?.profession} */}</p>
          <p>
            <strong>Profession Name:</strong> {profession?.professionName}
          </p>
          <p>
            <strong>Description:</strong> {profession?.professionDesc}
          </p>
        </div>
        <h2 className="mb-2 mt-6 text-offBlack">Work Portfolio</h2>
        <div className="border rounded-lg px-4 py-4">
          {profession && profession.portfolio.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {profession?.portfolio.map((image, index) => (
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
          {profession && profession.qualifications.length > 0 ? (
            profession.qualifications.map((qual, index) => (
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
      </div>
    </div>
  );
};
