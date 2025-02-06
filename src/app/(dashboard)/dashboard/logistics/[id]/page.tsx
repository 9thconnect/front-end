import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  BoxIcon,
  BriefcaseBusiness,
  Calendar,
  HandCoins,
  Handshake,
  Landmark,
  LayoutList,
  ListChecks,
  ListTodo,
  MapPin,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AnalyticCard from "@/components/cards/common/analyticCard";
import EarningDataTable from "@/components/tables/vendors/earnings/data-table";
import { EarningData } from "@/components/tables/professionals/earnings/columns";
import { formatCurrency } from "@/utils/format-currency";
import TwoStageAlertDialog from "@/components/alerts/twoStageAlertDialog";
import ProductDataTable from "@/components/tables/vendors/products/data-table";
import { siteConfig } from "@/config/site.config";
import SellerOverview from "@/sections/dashboard/seller/overview";
import OrderTableAdmin from "@/components/tables/admin/orders/data-table";
import { Suspense } from "react";
import TransactionDataTableAdmin from "@/components/tables/admin/transaction/data-table";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ params }: Props) => {
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-2">
          <Button
            className="rounded-full w-9 h-9 p-1 bg-gray-100"
            variant={"ghost"}
            // onClick={() => router.push(`professionals`)}
          >
            <ArrowLeft />
          </Button>
          <p className="text-2xl text-offBlack">Vendors</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap space-x-3 mt-3 sm:mt-0">
          <TwoStageAlertDialog
            triggerButton={<Button variant={"outline"}>Archive</Button>}
            triggerText="Archive"
            initialTitle="Archive User"
            nextTitle="Authenticate to Archive"
            initialDescription="Archiving this vendor will make their data inactive and they will no longer have access."
            apiUrl="https://example.com/api/archive"
            id={params.id}
          />
          <TwoStageAlertDialog
            triggerButton={<Button>Verify</Button>}
            triggerText="Verify"
            initialTitle="Vendor Verification"
            nextTitle="Authenticate"
            initialDescription="This action will verifiy the user, and they will be able to carry out actions on the application"
            apiUrl={`vendor/approve-business-profession/${params.id}/business`}
            id={params.id}
          />
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
            <SellerOverview id={params.id} />
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="Products">
          <div className="mt-3">
            {/* <ProductDataTable id={params.id} /> */}
          </div>
        </TabsContent>
        <TabsContent className="w-full border-t" value="Earning">
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
            {/* <EarningDataTable data={tableData} /> */}

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

export default page;
