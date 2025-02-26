"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Banknote,
  BriefcaseBusiness,
  Calendar,
  HandCoins,
  Handshake,
  Landmark,
  LayoutList,
  ListChecks,
  MapPin,
  Star,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticCard from "@/components/cards/common/analyticCard";
import EarningDataTable from "@/components/tables/professionals/earnings/data-table";
import { EarningData } from "@/components/tables/professionals/earnings/columns";
import { formatCurrency } from "@/utils/format-currency";
import TwoStageAlertDialog from "@/components/alerts/twoStageAlertDialog";
import { Overview } from "@/components/pages/admin/professional/single/overView";
import Link from "next/link";
import { Suspense } from "react";
import TransactionDataTableAdmin from "@/components/tables/admin/transaction/data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchVendorById } from "@/lib/requests/admin/vendor/admin-vendor-requests";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Jobs = () => {
  return (
    <div className="block lg:grid md:grid-cols-8 md:gap-8">
      <aside className="lg:self-start lg:sticky lg:col-span-3 lg:top-20 text-[#05141B]">
        <img
          src="https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__"
          alt=""
          className="rounded-lg"
        />
      </aside>
      <div className="lg:col-span-5 mt-10 lg:mt-0">
        <h2 className="mb-2 mt-6 text-offBlack">Performance</h2>
        <div className="grid grid-cols-2 gap-4">
          <AnalyticCard
            title="45"
            subTitle="Task Completed"
            Icon={ListChecks}
          />
          <AnalyticCard
            title="5"
            subTitle="Task Uncompleted"
            Icon={LayoutList}
          />
        </div>

        <h2 className="mb-2 mt-6 text-offBlack">Work History</h2>
        <div className="border rounded-lg px-4 py-4">
          {[1, 2, 3, 4, 5].map((history) => (
            <div
              key={`work-history-${history}`}
              className="pb-3 pt-3 border-b cursor-pointer"
            >
              <h4 className="text-primary underline">
                Abuja - Kaduna dual carriage Express way - SCC/FGN
              </h4>
              <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
                <div className="flex items-center">
                  <MapPin size={15} color="red" />
                  <span className="ml-2">Abuja, NG</span>
                </div>
                <div className="flex items-center">
                  <Star size={15} color="red" />
                  <span className="ml-2">4.5</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={15} color="red" />
                  <span className="ml-2">March - Sept 2024</span>
                </div>
              </div>
              <p className="mt-3">
                Sharafadeen design process was an absolute pleasure. The
                designer displayed an exceptional ability to translate my
                abstract ideas into tangible, visually stunning concepts.
              </p>
              <div className="flex items-center mt-3">
                <BriefcaseBusiness size={20} color="red" />
                <span className="ml-2 text-offBlack">₦ 47,500.00 per Day</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
            Professional Not Found
          </h3>
          <p className="text-gray-600 mt-2">
            The seller information could not be found
          </p>
        </div>
      </div>
    );
  }

  const profession = queryData?.data?.professions
    ? queryData?.data?.professions[0]
    : null;

  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-2">
          <Link
            className="rounded-full flex justify-center items-center w-9 h-9 p-1 bg-gray-100"
            href={"/dashboard/professionals"}
          >
            <ArrowLeft />
          </Link>
          <p className="text-2xl text-offBlack">Professional</p>
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

          {profession &&
            (!profession.professionRejected ||
              profession.professionApproved) && (
              <TwoStageAlertDialog
                triggerButton={<Button className="bg-red-700">Reject</Button>}
                triggerText="Reject"
                initialTitle="Reject Verification"
                nextTitle="Reason for Reject"
                initialDescription="You are about to reject a vendor, this action will send a rejection mail to the vendor."
                type="reject"
                apiUrl={`vendor/approve-business-profession/${profession._id}/profession/reject`}
              />
            )}

          {profession && !profession.professionApproved && (
            <TwoStageAlertDialog
              triggerButton={<Button>Verify</Button>}
              triggerText="Verify"
              initialTitle="Vendor Verification"
              nextTitle="Confirm Verification"
              initialDescription="This action will verify the user, and they will be able to carry out actions on the application"
              apiUrl={`vendor/approve-business-profession/${profession._id}/profession/approve`}
            />
          )}
        </div>
      </div>

      <Tabs defaultValue="spec" className="w-full mt-3 ">
        <TabsList className="w-full sm:justify-start">
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none "
            value="spec"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="review"
          >
            Jobs
          </TabsTrigger>
          <TabsTrigger
            className="bg-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="info"
          >
            Earning
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full border-t" value="spec">
          <div className="mt-3">
            {queryData?.data && <Overview vendor={queryData?.data} />}
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="review">
          <div className="mt-3">
            <Jobs />
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="info">
          <div className="mt-3 mb-3">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <AnalyticCard
                title={formatCurrency(3000000)}
                subTitle="total EARNINGS"
                Icon={Landmark}
              />
              <AnalyticCard
                title={formatCurrency(5000000)}
                subTitle="total SALES"
                Icon={Banknote}
              />
              <AnalyticCard
                title={formatCurrency(5000000)}
                subTitle="In-escrow"
                Icon={HandCoins}
              />
              <AnalyticCard
                title={formatCurrency(4450000)}
                subTitle="Paid"
                Icon={Handshake}
              />
            </div>
            <Suspense>
              <TransactionDataTableAdmin
                vendor={params.id}
                paymentFor="withdrawal"
              />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
