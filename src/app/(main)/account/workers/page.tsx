import AnalyticCard from "@/components/cards/common/analyticCard";
import AddWorkerModal from "@/components/modals/addWorkerModal";
import WorkerDataTable from "@/components/tables/vendors/workers/data-table";
import { formatCurrency } from "@/utils/format-currency";
import { UsersRound } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-offBlack my-2">Workers</h3>
        {/* <Button>Add Product</Button> */}
        <AddWorkerModal />
      </div>
      <div className="flex space-x-3 items-center mt-4">
        <AnalyticCard
          className="bg-primary/20"
          title={"123"}
          subTitle="Staff total"
          Icon={UsersRound}
        />
        <AnalyticCard title="4" subTitle="Type" Icon={UsersRound} />
        <AnalyticCard
          title={formatCurrency(50000000)}
          subTitle="Total Value"
          Icon={UsersRound}
        />
      </div>
      <div>
        <WorkerDataTable />
      </div>
    </div>
  );
};

export default page;
