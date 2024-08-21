import MainBadge from "@/components/badges/mainBadge";
import AnalyticCard from "@/components/cards/common/analyticCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format-currency";
import { ArrowLeft, HandCoins, Handshake, Landmark } from "lucide-react";
import React from "react";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ params }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="flex  items-center space-x-2">
        <Button
          className="rounded-full w-9 h-9 p-1 bg-gray-100"
          variant={"ghost"}
          // onClick={() => router.push(`professionals`)}
        >
          <ArrowLeft />
        </Button>
        <p className="text-2xl text-offBlack">Project Summary</p>
      </div>
      <div className="lg:grid grid-cols-6 mt-5 gap-5">
        <div className="col-span-2">
          <div className="border rounded-xl p-4">
            <p className="text-offBlack">
              Abuja - Kaduna dual carriage Express way - SCC/FGN
            </p>

            <Separator className="my-5" orientation="horizontal" />

            <div className="flex items-center mb-4">
              <p className="mr-7">Status:</p>
              <MainBadge text="Completed" type="green" />
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Date:</p>
              <p className="text-offBlack">Jan 20, 2024 - April 13, 2024</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="mr-7">Starting:</p>
              <p className="text-offBlack">{formatCurrency(200000)}</p>
            </div>
          </div>
          <h2 className="text-offBlack mt-5 mb-2">Feedbacks</h2>
          <div className="border rounded-xl p-4">
            <p className="text-offBlack mb-4">Client(s)</p>
            <div className="flex items-center mb-4">
              <p className="mr-7">Rating:</p>
              <p className="text-offBlack">4.5 Stars</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. In tellus sed auctor amet
              vulputate ac. Sed in pretium duis id orci. Cursus mi magna
              maecenas ornare eget habitant. Morbi nunc pretium nulla non
              maecenas et leo at dictum. Suspendisse viverra tristique et.
            </p>
            <Separator className="my-5" orientation="horizontal" />
            <p className="text-offBlack mb-4">Professional(s)</p>
            <div className="flex items-center mb-4">
              <p className="mr-7">Rating:</p>
              <p className="text-offBlack">4.5 Stars</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. In tellus sed auctor amet
              vulputate ac. Sed in pretium duis id orci. Cursus mi magna
              maecenas ornare eget habitant. Morbi nunc pretium nulla non
              maecenas et leo at dictum. Suspendisse viverra tristique et.
            </p>
          </div>
        </div>
        <div className="col-span-4">
          <h2 className="text-offBlack mt-5 mb-2">Performance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <AnalyticCard
              title={formatCurrency(3000000)}
              subTitle="Project total"
              Icon={Landmark}
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
          <h2 className="text-offBlack mt-5 mb-2">Contract Summary</h2>
          <div className="border rounded-xl p-4">
            <p>
              Lorem ipsum dolor sit amet consectetur. In tellus sed auctor amet
              vulputate ac. Sed in pretium duis id orci. Cursus mi magna
              maecenas ornare eget habitant. Morbi nunc pretium nulla non
              maecenas et leo at dictum. Suspendisse viverra tristique et.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="text-offBlack mt-5 mb-2">Client Details</h2>
              <div className="border rounded-xl p-4">
                <div className="flex items-center mb-4">
                  <p className="mr-7">UID:</p>
                  <p className="text-offBlack">W34567J</p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Name:</p>
                  <p className="text-offBlack">Ayomikun Jerry</p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Location:</p>
                  <p className="text-offBlack">Abuja, NG</p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Reg Date:</p>
                  <p className="text-offBlack">Jan 20, 2024 </p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Rating:</p>
                  <p className="text-offBlack">4.5 Stars</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <h2 className="text-offBlack mt-5 mb-2">Payment</h2>
              <div className="border rounded-xl p-4">
                <div className="flex items-center mb-4">
                  <p className="mr-7">Starting:</p>
                  <p className="text-offBlack">{formatCurrency(10000)}</p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Kickoff:</p>
                  <p className="text-offBlack">Jan 20, 2024 </p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Total:</p>
                  <p className="text-offBlack">{formatCurrency(340000)}</p>
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">Status:</p>
                  <MainBadge text="Completed" type="green" />
                </div>
                <div className="flex items-center mb-4">
                  <p className="mr-7">End Date:</p>
                  <p className="text-offBlack">Jan 20, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
