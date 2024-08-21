import AnalyticCard from "@/components/cards/common/analyticCard";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import SalesDataTable from "@/components/tables/recent-sales/data-table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { HandshakeIcon, ReceiptText, Wallet } from "lucide-react";
import React, { Suspense } from "react";
import { getDataSales } from "../home/page";

const page = async () => {
  const tableData = await getDataSales();
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Transactions</p>
        <div className="sm:flex flex-wrap sm:flex-nowrap">
          <DatePickerWithRange className="sm:mr-2 w-full" />
          <Button className="w-full sm:w-fit mt-2 sm:mt-0 font-normal">
            Download
          </Button>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <div className="md">
            <AnalyticCard
              title={formatCurrency(4000000)}
              subTitle="TOTAL REVENUE"
              Icon={ReceiptText}
            />
          </div>
          <div className="">
            <AnalyticCard
              title="30"
              subTitle="ALL TRANSACTION"
              Icon={HandshakeIcon}
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
      <Suspense>
        <SalesDataTable data={tableData} />
      </Suspense>
    </div>
  );
};

export default page;
