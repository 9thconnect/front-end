import AnalyticCard from "@/components/cards/common/analyticCard";
import RevenueChart from "@/components/charts/revenueChart";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import { SalesData } from "@/components/tables/recent-sales/columns";
import SalesDataTable from "@/components/tables/recent-sales/data-table";
import { Button } from "@/components/ui/button";
import { HandCoins, TriangleAlert, UsersRound, Wallet } from "lucide-react";
import React, { Suspense } from "react";

export async function getDataSales(): Promise<SalesData[]> {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `728ed52f-${i}`,
    orderId: "@333F22",
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as "pending" | "processing" | "success" | "failed",
    email: `user${i}@example.com`,
    customerName: `Customer ${i}`,
    stockLevel: Math.floor(Math.random() * 1000),
    customerPhoto: `https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ERwQvLzCOxhut7YvIj6lVEY4s1a4xlDjNaL7VkptWvT~c~BDNzG2gLVlobqEFwouW-6kEjatmSUbB2uyEAnBdQS0wgOls5a0p0JoDNnTUWYvsQys3mhj2IlndFyEwkaIWV7d6wWDEqpjXFtrBC3Ni9hFlKW9lQpH5eeHjdTO1zIWPuTk~LtR6r2xB1S3GSzMI3fGveq4utQ1DrqzyzCo1Av82qz5bOJBpQV7d6EywqfL0-MwqPi6XYsQIQ5NIBmaoLaJup9Iv8cme7NjXhv5Lhht~mZAv5sOuhy3Ta1yyw2NkQhSQBZFrUTAuFzIAEzCWkm7X6yG5~eJG-WvPeXTNw__`,
  }));
}

const page = async () => {
  const tableData = await getDataSales();
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Dashboard</p>
        <div className="sm:flex flex-wrap sm:flex-nowrap">
          <Button className="w-full sm:w-fit mt-2 sm:mt-0 font-normal">
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="col-span-1 border rounded-2xl overflow-hidden p-2.5">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-lg text-offBlack">Analysis</p>
            <DatePickerWithRange />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <AnalyticCard
              title="50"
              subTitle="ALL CUSTOMERS"
              Icon={UsersRound}
            />
            <AnalyticCard
              title="₦ 50,700,000.00"
              subTitle="TOTAL REVENUE"
              Icon={HandCoins}
            />
            <AnalyticCard
              title="₦ 7,000,000.00"
              subTitle="PENDING PAYMENT"
              Icon={Wallet}
            />
            <AnalyticCard
              title="₦ 7,000,000.00"
              subTitle="PENDING PAYMENT"
              Icon={Wallet}
            />
          </div>
        </div>
        <div className="col-span-1 border rounded-2xl overflow-hidden p-2.5">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-lg text-offBlack">Revenue Trend</p>
            <DatePickerWithRange />
          </div>

          <RevenueChart />
        </div>
      </div>

      <Suspense>
        <SalesDataTable data={tableData} />
      </Suspense>
    </div>
  );
};

export default page;
