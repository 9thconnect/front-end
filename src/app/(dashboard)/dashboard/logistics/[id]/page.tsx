"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TwoStageAlertDialog from "@/components/alerts/twoStageAlertDialog";
import SellerOverview from "@/sections/dashboard/seller/overview";
import { Suspense } from "react";
import TransactionDataTableAdmin from "@/components/tables/admin/transaction/data-table";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchVendorById } from "@/lib/requests/admin/vendor/admin-vendor-requests";
import { Skeleton } from "@/components/ui/skeleton";
import LogisticsTable from "@/components/tables/admin/logistics/data-table";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params }: Props) => {
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-business", params.id],
    queryFn: () => fetchVendorById(params.id),
  });

  if (isLoading) {
    return (
      <div className="block lg:grid md:grid-cols-8 md:gap-8 h-screen">
        <aside className="lg:self-start lg:sticky lg:col-span-3 lg:top-20 text-[#05141B]">
          <Skeleton className="rounded-lg h-80" />
        </aside>
        <div className="lg:col-span-5 mt-10 lg:mt-0">
          {[1, 2, 3, 4, 5, 6, 7].map((a) => (
            <Skeleton
              key={`${a}-skeleton`}
              className="rounded-lg h-10 w-full mb-3"
            />
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

  if (!queryData?.data) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Logistics Not Found
          </h3>
          <p className="text-gray-600 mt-2">
            The seller information could not be found
          </p>
        </div>
      </div>
    );
  }

  const business = queryData?.data?.businesses
    ? queryData?.data?.businesses[0]
    : null;
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-2">
          <Link
            className="rounded-full w-9 h-9  flex justify-center items-center  p-1 bg-gray-100"
            href={"/dashboard/logistics"}
          >
            <ArrowLeft />
          </Link>
          <p className="text-2xl text-offBlack">Vendors</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap space-x-3 mt-3 sm:mt-0">
          {!queryData?.data?.accountSuspend && (
            <TwoStageAlertDialog
              triggerButton={<Button variant={"outline"}>Suspend</Button>}
              triggerText="Suspend"
              initialTitle="Suspend User"
              nextTitle="Reason for Suspension"
              initialDescription="Suspending this vendor will make their data inactive and they will no longer have access."
              apiUrl={`vendor/suspend-unsuspend-account/${queryData.data._id}/suspend`}
              type="suspend"
            />
          )}

          {queryData?.data?.accountSuspend && (
            <TwoStageAlertDialog
              triggerButton={<Button variant={"outline"}>Reinstate</Button>}
              triggerText="Reinstate"
              initialTitle="Reinstate User"
              nextTitle="You are about to reinstate a vendor"
              initialDescription="Reinstating this vendor will make their data active and they will have access."
              apiUrl={`vendor/suspend-unsuspend-account/${queryData?.data?._id}/activate`}
              type="approve"
            />
          )}

          {business &&
            (!business.businessRejected || business.businessApproved) && (
              <TwoStageAlertDialog
                triggerButton={<Button className="bg-red-700">Reject</Button>}
                triggerText="Reject"
                initialTitle="Reject Verification"
                nextTitle="Reason for Reject"
                initialDescription="You are about to reject a vendor, this action will send a rejection mail to the vendor."
                type="reject"
                apiUrl={`vendor/approve-business-profession/${business._id}/business/reject`}
              />
            )}

          {business && !business.businessApproved && (
            <TwoStageAlertDialog
              triggerButton={<Button>Verify</Button>}
              triggerText="Verify"
              initialTitle="Vendor Verification"
              nextTitle="Confirm Verification"
              initialDescription="This action will verify the user, and they will be able to carry out actions on the application"
              apiUrl={`vendor/approve-business-profession/${business._id}/business/approve`}
            />
          )}
        </div>
      </div>

      <Tabs defaultValue="Overview" className="w-full mt-3 ">
        <TabsList className="w-full sm:justify-start">
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none "
            value="Overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="Products"
          >
            Fleet
          </TabsTrigger>
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="Earning"
          >
            Earning
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full border-t" value="Overview">
          <div className="mt-3">
            {queryData?.data && <SellerOverview vendor={queryData?.data} />}
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="Products">
          <div className="mt-3">
            <LogisticsTable />
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="Earning">
          <div className="mt-3 mb-3">
            <Suspense>
              <TransactionDataTableAdmin
                vendor={params.id}
                paymentFor="withdrawal"
              />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="Orders">
          <div className="mt-3">
            {/* <OrderTableAdmin vendor={params.id} /> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
