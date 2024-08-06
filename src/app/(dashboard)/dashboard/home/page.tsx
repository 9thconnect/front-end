import AnalyticCard from "@/components/cards/common/analyticCard";
import RevenueChart from "@/components/charts/revenueChart";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import { Button } from "@/components/ui/button";
import { HandCoins, UsersRound, Wallet } from "lucide-react";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Dashboard</p>
        <div className="flex ">
          <DatePickerWithRange className="mr-2" />
          <Button className="font-normal">Download</Button>
        </div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid lg:grid-cols-3 gap-5 mt-6">
          <div className="md">
            <AnalyticCard
              title="50"
              subTitle="ALL CUSTOMERS"
              Icon={UsersRound}
            />
          </div>
          <div className="">
            <AnalyticCard
              title="₦ 50,700,000.00"
              subTitle="TOTAL REVENUE"
              Icon={HandCoins}
            />
          </div>
          <div className="">
            <AnalyticCard
              title="₦ 7,000,000.00"
              subTitle="PENDING PAYMENT"
              Icon={Wallet}
            />
          </div>
        </div>
      </Suspense>
      <Suspense fallback={<p>Chart Data</p>}>
        <div className="grid lg:grid-cols-5 mt-4 gap-3">
          <div className="col-span-3 border rounded-lg p-3">
            <p>Sales Chart</p>
            <RevenueChart />
          </div>
          <div className="col-span-2 border rounded-lg p-3">hello</div>
        </div>
      </Suspense>
    </div>
  );
};

export default page;
