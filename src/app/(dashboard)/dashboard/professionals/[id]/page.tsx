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

async function getEarningSales(): Promise<EarningData[]> {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `728ed52f-${i}`,
    date: new Date(),
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as "pending" | "processing" | "success" | "failed",
    email: `user${i}@example.com`,
    customerName: `Customer ${i}`,
    amount: Math.floor(Math.random() * 1000),
    customerPhoto: `https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ERwQvLzCOxhut7YvIj6lVEY4s1a4xlDjNaL7VkptWvT~c~BDNzG2gLVlobqEFwouW-6kEjatmSUbB2uyEAnBdQS0wgOls5a0p0JoDNnTUWYvsQys3mhj2IlndFyEwkaIWV7d6wWDEqpjXFtrBC3Ni9hFlKW9lQpH5eeHjdTO1zIWPuTk~LtR6r2xB1S3GSzMI3fGveq4utQ1DrqzyzCo1Av82qz5bOJBpQV7d6EywqfL0-MwqPi6XYsQIQ5NIBmaoLaJup9Iv8cme7NjXhv5Lhht~mZAv5sOuhy3Ta1yyw2NkQhSQBZFrUTAuFzIAEzCWkm7X6yG5~eJG-WvPeXTNw__`,
  }));
}

const page = async ({ params }: Props) => {
  //   const router = useRouter();
  const tableData = await getEarningSales();
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

        <div className="sm:flex flex-wrap sm:flex-nowrap sm:space-x-3 space-x-0">
          <TwoStageAlertDialog
            triggerButton={<Button variant={"outline"}>Archive</Button>}
            triggerText="Archive"
            initialTitle="Archive User"
            nextTitle="Authenticate to Archive"
            initialDescription="Archiving this user will make their data inactive and they will no longer have access."
            apiUrl="https://example.com/api/archive"
          />
          <TwoStageAlertDialog
            triggerButton={<Button className="bg-red-700">Reject</Button>}
            triggerText="Reject"
            initialTitle="Reject Verification"
            nextTitle="Reason for Reject"
            initialDescription="You are about to reject a professional, this action will send a rejection mail to the vendor."
            type="reject"
            apiUrl={`vendor/approve-business-profession/${params.id}/profession/reject`}
          />
          <TwoStageAlertDialog
            triggerButton={<Button>Verify</Button>}
            triggerText="Verify"
            initialTitle="Professional Verification"
            nextTitle="Confirm Verification"
            initialDescription="This action will verify the professional, and they will be able to carry out actions on the application"
            apiUrl={`vendor/approve-business-profession/${params.id}/profession/approve`}
          />
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
            <Overview id={params.id} />
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
            <EarningDataTable data={tableData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
