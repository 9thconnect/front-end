"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBusinesses } from "@/lib/requests/admin/seller/admin-seller-requests";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ShieldCheck, Star } from "lucide-react";

const SellerOverview = ({ id }: { id: string }) => {
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-businesses"],
    queryFn: () => fetchBusinesses({ search: "" }),
  });

  if (isLoading) {
    return (
      <div className="block lg:grid md:grid-cols-8 md:gap-8 h-screen">
        <aside className="lg:self-start lg:sticky lg:col-span-3 lg:top-20 text-[#05141B]">
          <Skeleton className="rounded-lg h-80" />
        </aside>
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          {[1, 2, 3, 4, 5, 6, 7].map((a) => (
            <Skeleton className="rounded-lg h-10 w-full mb-3" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-600">
            Something went wrong
          </h3>
          <p className="text-gray-600 mt-2">
            Failed to load seller information
          </p>
        </div>
      </div>
    );
  }

  const data = queryData?.data?.data.businesses.find((data) => data._id === id);

  if (!data) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Seller Not Found
          </h3>
          <p className="text-gray-600 mt-2">
            The seller information could not be found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block lg:grid md:grid-cols-8 md:gap-8">
      <aside className="lg:self-start lg:sticky lg:col-span-3 lg:top-20 text-[#05141B]">
        <div
          className="w-full min-h-96 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${data?.vendor?.avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </aside>
      <div className="lg:col-span-5 mt-10 lg:mt-0">
        <div className="justify-between flex">
          <h2 className="text-3xl text-black mt-3">{data?.vendor?.fullName}</h2>

          {data?.businessApproved ? (
            <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">Verified</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-red-500 text-white inline-flex items-center self-start px-2 py-1">
              <ShieldCheck size={15} />
              <p className="text-xs ml-2">unverified</p>
            </div>
          )}
        </div>

        <div className="flex space-x-4 flex-wrap mt-3 items-center text-gray-950">
          <div className="flex ">
            <MapPin size={20} color="red" />
            <span className="ml-2">{data?.shopAddress}</span>
          </div>
        </div>
        <div className="mt-5">
          <div className="border rounded-lg px-4 py-4">
            <h2 className="text-offBlack">Personal Info</h2>
            <Separator className="my-2" />
            <div className="flex items-center mb-4">
              <p className="mr-7">UID:</p>
              <p className="text-offBlack">{data?.vendor?.vendorID}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Name:</p>
              <p className="text-offBlack">{data?.vendor?.fullName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Location:</p>
              <p className="text-offBlack">{data?.shopAddress}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Reg Date:</p>
              <p className="text-offBlack">{data?.vendor?.createdAt}</p>
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
              <p className="text-offBlack">{data?.businessLegalName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">CAC:</p>
              <p className="text-offBlack">{data?.businessRegNo}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Email:</p>
              <p className="text-offBlack">{data?.businessEmail}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Phone:</p>
              <p className="text-offBlack">{data?.businessPhoneNumber}</p>
            </div>

            <h2 className="text-offBlack">Shop details</h2>
            <Separator className="my-2" />
            <div className="flex items-center mb-4">
              <p className="mr-7">Name:</p>
              <p className="text-offBlack">{data?.shopName}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Type:</p>
              <p className="text-offBlack">{data?.businessType?.title} </p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Category:</p>
              <p className="text-offBlack">{data?.businessType?.title}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Address:</p>
              <p className="text-offBlack">{data?.businessDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
