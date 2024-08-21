import AnalyticCard from "@/components/cards/common/analyticCard";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import { ProfessionalData } from "@/components/tables/professionals/columns";
import ProfessionalDataTable from "@/components/tables/professionals/data-table";
import { Button } from "@/components/ui/button";
import { UsersRoundIcon } from "lucide-react";
import React from "react";

export async function getDataProfessionals(): Promise<ProfessionalData[]> {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `728ed52f-${i}`,
    date: new Date(),
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as "pending" | "processing" | "success" | "failed",
    email: `user${i}@example.com`,
    customerName: `Customer ${i}`,
    customerPhoto: `https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ERwQvLzCOxhut7YvIj6lVEY4s1a4xlDjNaL7VkptWvT~c~BDNzG2gLVlobqEFwouW-6kEjatmSUbB2uyEAnBdQS0wgOls5a0p0JoDNnTUWYvsQys3mhj2IlndFyEwkaIWV7d6wWDEqpjXFtrBC3Ni9hFlKW9lQpH5eeHjdTO1zIWPuTk~LtR6r2xB1S3GSzMI3fGveq4utQ1DrqzyzCo1Av82qz5bOJBpQV7d6EywqfL0-MwqPi6XYsQIQ5NIBmaoLaJup9Iv8cme7NjXhv5Lhht~mZAv5sOuhy3Ta1yyw2NkQhSQBZFrUTAuFzIAEzCWkm7X6yG5~eJG-WvPeXTNw__`,
  }));
}

const page = async () => {
  const tableData = await getDataProfessionals();
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Professional</p>
        <div className="sm:flex flex-wrap sm:flex-nowrap">
          <Button className="w-full sm:w-fit mt-2 sm:mt-0 font-normal">
            Download
          </Button>
        </div>
      </div>
      <div className="mt-5 rounded-lg border p-3">
        <div className="flex justify-between items-center">
          <p className="text-offBlack">Analysis</p>
          <DatePickerWithRange />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
          <div className="md">
            <AnalyticCard
              title="5,000"
              subTitle="TOTAL"
              Icon={UsersRoundIcon}
            />
          </div>
          <div className="">
            <AnalyticCard title="3,000" subTitle="NEW" Icon={UsersRoundIcon} />
          </div>
          <div className="">
            <AnalyticCard
              title="2,500"
              subTitle="VERIFIED"
              Icon={UsersRoundIcon}
            />
          </div>
          <div className="">
            <AnalyticCard
              title="300"
              subTitle="ARCHIVED"
              Icon={UsersRoundIcon}
            />
          </div>
        </div>
      </div>

      <ProfessionalDataTable data={tableData} />
    </div>
  );
};

export default page;
