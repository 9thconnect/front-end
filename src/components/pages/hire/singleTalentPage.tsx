import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Separator } from "@/components/ui/separator";
import TopRatedProfessions from "@/sections/common/topRatedProfessions";
import {
  BriefcaseBusiness,
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Button } from "@/components/ui/button";
import SendProposalModal from "@/components/modals/sendProposalModal";

const SingleTalentPage = ({ id }: { id: string }) => {
  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/marketplace">Professionals</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              Profession Name
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SectionContainer>
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <aside className="md:self-start md:sticky md:col-span-3 md:top-56 text-[#05141B]">
            <img
              src="https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VM0cTDRJ~Srpn27yJabUwg49v95Fnvj3eCJ8wW1Tfp~IbhOzt64tG2Zv4q8DOuMYrwnPyMqUldfwV~4kmCGc0qEXazXSd4YPvKuHm0tutdzE2U9fw0SrIu7Cu2A~ObsVBEjQ9~8unhRmokb4NF~-5Dc5qJe57wUDSUy6F662ndCCYYqFxlT-X~RQsce2RjspmSTJpBrwTN-fOmqLvz5OX7ZF1QMn2JsU8NGzjgUTI0gTVx7TK70Grc~M8P~F0VEsH-Qa70T1zOn07IDIBAEOMYLIUgk6Sbk6YsHaHhCelK58JyfP-rZa2-06KGipYLWDERW1wB03nLqxbO4iu6HvFw__"
              alt=""
              className="rounded-lg"
            />
            <div>
              <h2 className="my-3">Qualification</h2>
              <div className="border rounded-lg px-4 pb-4">
                <div className="flex justify-between [&>*]:mt-5">
                  <div>
                    <h4 className="">PhD Human Experience Design</h4>
                    <p className="text-[#7C7C7C] text-xs">
                      University of Design, Los Angeles
                    </p>
                  </div>
                  <p>2015</p>
                </div>
                <div className="flex justify-between [&>*]:mt-5">
                  <div>
                    <h4 className="">PhD Human Experience Design</h4>
                    <p className="text-[#7C7C7C] text-xs">
                      University of Design, Los Angeles
                    </p>
                  </div>
                  <p>2015</p>
                </div>
                <div className="flex justify-between [&>*]:mt-5">
                  <div>
                    <h4 className="">PhD Human Experience Design</h4>
                    <p className="text-[#7C7C7C] text-xs">
                      University of Design, Los Angeles
                    </p>
                  </div>
                  <p>2015</p>
                </div>
                <div className="flex justify-between [&>*]:mt-5">
                  <div>
                    <h4 className="">PhD Human Experience Design</h4>
                    <p className="text-[#7C7C7C] text-xs">
                      University of Design, Los Angeles
                    </p>
                  </div>
                  <p>2015</p>
                </div>
              </div>
              <h2 className="my-3">Professional Rate</h2>
              <div className="border rounded-lg px-4 py-4">
                # 100,000 per day
              </div>
            </div>
          </aside>
          <div className="md:col-span-5 mt-10 md:mt-0">
            <div className="justify-between flex">
              <p>Architecture & Design</p>
              <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                <ShieldCheck size={20} />
                <p className="text-sm">Verified</p>
              </div>
            </div>
            <h2 className="text-3xl text-black mt-3">Sharafadeen Mubarak</h2>
            <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
              <div className="flex">
                <MapPin size={20} color="red" />
                <span className="ml-2">Abuja, NG</span>
              </div>
              <div className="flex">
                <Star size={20} color="red" />
                <span className="ml-2">4.5</span>
              </div>
              <div className="flex">
                <Separator orientation="vertical" />
                <span className="ml-2">45 reviews</span>
              </div>
            </div>
            <h2 className="mb-2 mt-6 text-offBlack">Overview</h2>
            <div className="border rounded-lg px-4 py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit temporibus quasi assumenda cumque hic, nulla
              voluptatum voluptas porro fugit molestiae, sed accusantium in
              beatae ut aperiam aliquam vel inventore maiores. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reprehenderit temporibus
              quasi assumenda cumque hic, nulla voluptatum voluptas porro fugit
              molestiae, sed accusantium in beatae ut aperiam aliquam vel
              inventore maiores. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Reprehenderit temporibus quasi assumenda cumque
              hic, nulla voluptatum voluptas porro fugit molestiae, sed
              accusantium in beatae ut aperiam aliquam vel inventore maiores.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit temporibus quasi assumenda cumque hic, nulla
              voluptatum voluptas porro fugit molestiae, sed accusantium in
              beatae ut aperiam aliquam vel inventore maiores. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reprehenderit temporibus
              quasi assumenda cumque hic, nulla voluptatum voluptas porro fugit
              molestiae, sed accusantium in beatae ut aperiam aliquam vel
              inventore maiores.
            </div>
            <h2 className="mb-2 mt-6 text-offBlack">Work History</h2>
            <div className="border rounded-lg px-4 py-4">
              {[1, 2, 3, 4, 5].map((history) => (
                <div
                  key={`work-history-${history}`}
                  className="pb-3 pt-3 border-b"
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
                    <span className="ml-2 text-offBlack">
                      ₦ 47,500.00 per Day
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="mb-2 mt-6 text-offBlack">Work Portfolio</h2>
            <div className="border rounded-lg px-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 1"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 2"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 3"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 4"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 3"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <img
                  src="https://s3-alpha-sig.figma.com/img/70cd/7a9f/30847743bf8ee9016366e504bdb1c836?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b6ANOJaABsDrQTdyh0dTh5z6GDyQatTZIQFg5h74m2jq3aOUHkdUBJTA~sPekrOZnIkl-UqIopIaXRJdgVjHYdLoUkYzpBtL03HfuXYBBGIEaMgT8jh6xgLJs2xwb25jLOFe0V-bWg5h3dttbkmXU~DApmlGUcNEEB~fLUhWLttrj4Cy5F7fJCnByEz5fMRqnVkygv-GhgCSyXWVqZOq4k2AiZpUeb2I4Ps~yGiqAEpZl31HwuM-5oiJ6-~i1dygaHuZroDrg50HmjrMLRJCkQ~xZ4xZd8cFRyp4743FeQX9IyUoILNgwsFwvUnV3P1KvVwhU0uRxus5gAbmPHx0Mw__"
                  alt="Work 4"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mt-7 w-full">
              <SendProposalModal />
            </div>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <SectionCardHeader
          title={"Similar Professionals"}
          linkUrl={"/hire/home"}
          linkText="See more"
        />
        <div className="mt-5">
          <TopRatedProfessions />
        </div>
      </SectionContainer>
    </div>
  );
};

export default SingleTalentPage;
