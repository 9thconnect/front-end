"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchBusinessById,
  fetchBusinesses,
} from "@/lib/requests/admin/seller/admin-seller-requests";
import { IVendor } from "@/type/users";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ShieldCheck, Star } from "lucide-react";

const SellerOverview = ({ vendor }: { vendor: IVendor }) => {
  const business = vendor?.businesses ? vendor?.businesses[0] : null;

  return (
    <div className="block lg:grid md:grid-cols-8 md:gap-8">
      <aside className="lg:self-start lg:sticky lg:col-span-3 lg:top-20 text-[#05141B]">
        <div
          className="w-full min-h-96 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${vendor?.avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </aside>
      <div className="lg:col-span-5 mt-10 lg:mt-0">
        <div className="justify-between flex">
          <h2 className="text-3xl text-black mt-3">{vendor?.fullName}</h2>

          {vendor.accountSuspend ? (
            <div className="rounded-2xl bg-red-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Account Suspended</p>
            </div>
          ) : business?.businessApproved ? (
            <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Business Verified</p>
            </div>
          ) : business?.businessRejected ? (
            <div className="rounded-2xl bg-red-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Business Rejected</p>
            </div>
          ) : business?.businessPending ? (
            <div className="rounded-2xl bg-gray-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Business Pending</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">unattended</p>
            </div>
          )}
        </div>

        <div className="flex space-x-4 flex-wrap mt-3 items-center text-gray-950">
          <div className="flex ">
            <MapPin size={20} color="red" />
            <span className="ml-2">{business?.shopAddress}</span>
          </div>
        </div>
        <div className="mt-5">
          <div className="border rounded-lg px-4 py-4">
            <h2 className="text-offBlack">Personal Info</h2>
            <Separator className="my-2" />
            <div className="flex items-center mb-4">
              <p className="mr-7">UID:</p>
              <p className="text-offBlack">{vendor?.vendorID}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Name:</p>
              <p className="text-offBlack">{vendor?.fullName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Location:</p>
              <p className="text-offBlack">{business?.shopAddress}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Reg Date:</p>
              <p className="text-offBlack">{vendor?.createdAt}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Rating:</p>
              <p className="text-offBlack">4.5 Stars</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="border rounded-lg px-4 py-4">
            <h2 className="text-offBlack">Business</h2>
            <Separator className="my-2" />
            <div className="flex items-center mb-4">
              <p className="mr-7">Business:</p>
              <p className="text-offBlack">{business?.businessLegalName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">CAC:</p>
              <p className="text-offBlack">{business?.businessRegNo}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Email:</p>
              <p className="text-offBlack">{business?.businessEmail}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Phone:</p>
              <p className="text-offBlack">{business?.businessPhoneNumber}</p>
            </div>

            <h2 className="text-offBlack">Shop details</h2>
            <Separator className="my-2" />
            <div className="flex items-center mb-4">
              <p className="mr-7">Name:</p>
              <p className="text-offBlack">{business?.shopName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Address:</p>
              <p className="text-offBlack">{business?.businessDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
