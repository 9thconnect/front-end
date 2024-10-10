"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/chat/chatWindow";
import ChatInput from "@/components/chat/chatInput";
import CompleteProjectModal from "@/components/modals/completeProject";

interface Message {
  text: string;
  time: string;
  date: string;
  isOwnMessage: boolean;
  owner: {
    name: string;
    avatar: string;
  };
}

const SingleProjectPage = () => {
  const chat = useRef<HTMLInputElement>();
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handOnChange = (text: string) => {
    setMessage(chat?.current?.value as string);
  };

  useEffect(() => {
    if (message.length > 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [message]);

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello!",
      time: "11:50 AM",
      date: "July 15",
      isOwnMessage: false,
      owner: {
        name: "Mubarak Som",
        avatar:
          "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VM0cTDRJ~Srpn27yJabUwg49v95Fnvj3eCJ8wW1Tfp~IbhOzt64tG2Zv4q8DOuMYrwnPyMqUldfwV~4kmCGc0qEXazXSd4YPvKuHm0tutdzE2U9fw0SrIu7Cu2A~ObsVBEjQ9~8unhRmokb4NF~-5Dc5qJe57wUDSUy6F662ndCCYYqFxlT-X~RQsce2RjspmSTJpBrwTN-fOmqLvz5OX7ZF1QMn2JsU8NGzjgUTI0gTVx7TK70Grc~M8P~F0VEsH-Qa70T1zOn07IDIBAEOMYLIUgk6Sbk6YsHaHhCelK58JyfP-rZa2-06KGipYLWDERW1wB03nLqxbO4iu6HvFw__",
      },
    },
    {
      text: "Hi there!",
      time: "11:51 AM",
      date: "July 15",
      isOwnMessage: true,
      owner: {
        name: "Mubarak Som",
        avatar:
          "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VM0cTDRJ~Srpn27yJabUwg49v95Fnvj3eCJ8wW1Tfp~IbhOzt64tG2Zv4q8DOuMYrwnPyMqUldfwV~4kmCGc0qEXazXSd4YPvKuHm0tutdzE2U9fw0SrIu7Cu2A~ObsVBEjQ9~8unhRmokb4NF~-5Dc5qJe57wUDSUy6F662ndCCYYqFxlT-X~RQsce2RjspmSTJpBrwTN-fOmqLvz5OX7ZF1QMn2JsU8NGzjgUTI0gTVx7TK70Grc~M8P~F0VEsH-Qa70T1zOn07IDIBAEOMYLIUgk6Sbk6YsHaHhCelK58JyfP-rZa2-06KGipYLWDERW1wB03nLqxbO4iu6HvFw__",
      },
    },
    // More messages...
  ]);

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      text: messageText,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
      isOwnMessage: true,
      owner: {
        name: "Mubarak Som",
        avatar:
          "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VM0cTDRJ~Srpn27yJabUwg49v95Fnvj3eCJ8wW1Tfp~IbhOzt64tG2Zv4q8DOuMYrwnPyMqUldfwV~4kmCGc0qEXazXSd4YPvKuHm0tutdzE2U9fw0SrIu7Cu2A~ObsVBEjQ9~8unhRmokb4NF~-5Dc5qJe57wUDSUy6F662ndCCYYqFxlT-X~RQsce2RjspmSTJpBrwTN-fOmqLvz5OX7ZF1QMn2JsU8NGzjgUTI0gTVx7TK70Grc~M8P~F0VEsH-Qa70T1zOn07IDIBAEOMYLIUgk6Sbk6YsHaHhCelK58JyfP-rZa2-06KGipYLWDERW1wB03nLqxbO4iu6HvFw__",
      },
    };
    setMessages([newMessage, ...messages]);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <Breadcrumb className="my-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/marketplace">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary capitalize">
                Project Name
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex space-x-3 items-center">
          <CompleteProjectModal />
          <Button variant={"outline"}>Terminate Project</Button>
        </div>
      </div>

      <SectionContainer>
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <aside className="md:self-start md:sticky md:col-span-3 md:top-56 text-[#05141B]">
            <img
              src="https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VM0cTDRJ~Srpn27yJabUwg49v95Fnvj3eCJ8wW1Tfp~IbhOzt64tG2Zv4q8DOuMYrwnPyMqUldfwV~4kmCGc0qEXazXSd4YPvKuHm0tutdzE2U9fw0SrIu7Cu2A~ObsVBEjQ9~8unhRmokb4NF~-5Dc5qJe57wUDSUy6F662ndCCYYqFxlT-X~RQsce2RjspmSTJpBrwTN-fOmqLvz5OX7ZF1QMn2JsU8NGzjgUTI0gTVx7TK70Grc~M8P~F0VEsH-Qa70T1zOn07IDIBAEOMYLIUgk6Sbk6YsHaHhCelK58JyfP-rZa2-06KGipYLWDERW1wB03nLqxbO4iu6HvFw__"
              alt=""
              className="rounded-lg"
            />
            <div className="mt-8">
              <div className="justify-between flex">
                <p>Architecture & Design</p>
                <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                  <ShieldCheck size={15} />
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
              <h2 className="mb-2 mt-6 text-offBlack text-xl">
                Ongoing Project
              </h2>
              <div className="border rounded-lg px-4 py-4">
                <div className="pb-3 pt-3 ">
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
              </div>
              <h2 className="my-3 text-xl">Professional Rate</h2>
              <div className="border rounded-lg px-4 py-4">
                # 100,000 per day
              </div>
            </div>
          </aside>
          <div className="md:col-span-5 mt-10 md:mt-0">
            <h4>Message history</h4>
            <div className="border h-[600px] rounded-lg">
              <div className="flex flex-col h-full w-full">
                <ChatWindow messages={messages} />
              </div>
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <SectionCardHeader
          title={"Similar Professionals"}
          linkUrl={"/hire/home"}
          linkText="See more"
        />
        {/* <div className="mt-5">
          <TopRatedProfessions />
        </div> */}
      </SectionContainer>
    </div>
  );
};

export default SingleProjectPage;
