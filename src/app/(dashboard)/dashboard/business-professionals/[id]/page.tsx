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
          />
          <TwoStageAlertDialog
            triggerButton={<Button>Verify</Button>}
            triggerText="Verify"
            initialTitle="Vendor Verification"
            nextTitle="Authenticate"
            initialDescription="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            apiUrl={`vendor/approve-business-profession/${params.id}/business`}
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
            Artisans
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
