"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Separator } from "@/components/ui/separator";
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
import requests from "@/utils/requests";
import { useAppSelector } from "@/lib/redux/hooks";
import { UserType } from "@/lib/redux/features/auth/authSlice";

export interface Message {
  _id: string;
  conversationId: string;
  professional: {
    _id: string;
    fullName: string;
    vendorID: string;
    avatar: string;
  };
  customer: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  sender: "professional" | "customer";
  receiver: "professional" | "customer";
  body: string;
  selectedFile?: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileFormat: string;
  };
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  delivered?: boolean;
  tempId?: string;
}

interface Conversation {
  _id: string;
  customerId: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  professionalId: {
    _id: string;
    fullName: string;
    vendorID: string;
    avatar: string;
  };
  project: {
    _id: string;
    projectID: string;
    status: string;
  };
}

interface ConversationResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    conversations: Array<Conversation>;
  };
}

interface MessagesResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    messages: Message[];
  };
}

interface ProfessionalData {
  fullName: string;
  profession: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  avatar: string;
  rate: number;
}

const SingleProjectPage = ({ id }: { id: string }) => {
  const [conversationId, setConversationId] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const userType = useAppSelector((state) => state.auth.type);

  const queryClient = useQueryClient();

  // Fetch conversation list
  const {
    data: conversationData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", id],
    queryFn: () =>
      requests.get<ConversationResponse>(
        `chat/${userType}/conversation-list?pageNumber=1`
      ),
  });

  useEffect(() => {
    if (
      !isError &&
      !isLoading &&
      conversationData &&
      conversationData.data &&
      conversationData.data.data.conversations.length > 0
    ) {
      const convId = conversationData.data.data.conversations[0]._id;
      setConversationId(conversationData.data.data.conversations[0]._id);
      setConversation(conversationData.data.data.conversations[0]);

      requests
        .get<MessagesResponse>(`chat/${userType}/messages/${convId}`)
        .then((response) => {
          if (response.data)
            setMessages(
              response.data.data.messages.map((msg) => {
                let message: Message = {
                  ...msg,
                  delivered: true,
                };

                return message;
              })
            );
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [conversationData, isError, isLoading, userType]);

  // Fetch messages
  const { data: messagesData } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () =>
      requests.get<MessagesResponse>(
        `chat/${userType}/messages/${conversationId}`
      ),
    enabled: !!conversationId,
  });

  // Fetch professional data
  const { data: professionalData } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => requests.get<ProfessionalData>(`vendor/vendor/${id}`),
  });

  const handleSendMessage = async (
    messageText: string,
    fileInfo?: {
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileSize: number;
      fileFormat: string;
    }
  ) => {
    if (!conversationId) return;

    const tempId = Date.now().toString();
    const tempMessage: Message = {
      _id: tempId,
      conversationId,
      body: messageText,
      sender: userType == UserType.CUSTOMER ? "customer" : "professional",
      receiver: userType == UserType.CUSTOMER ? "professional" : "customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRead: false,
      delivered: false,
      tempId,
      professional: {
        _id: conversation!.professionalId._id,
        fullName: conversation!.professionalId.fullName,
        vendorID: conversation!.professionalId.vendorID,
        avatar: conversation!.professionalId.avatar,
      },

      customer: {
        _id: conversation!.customerId._id,
        fullName: conversation!.customerId.fullName,
        avatar: conversation!.customerId.avatar,
      },
      selectedFile: fileInfo,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await requests.post(`chat/${userType}/message`, {
        body: messageText,
        conversationId,
        selectedFile: fileInfo,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...tempMessage, delivered: true } : msg
        )
      );

      // Invalidate and refetch messages
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
    }
  };

  if (!professionalData) return <div>Loading...</div>;

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
                {professionalData.data?.fullName}
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
          {professionalData && professionalData.data && (
            <aside className="md:self-start md:sticky md:col-span-3 md:top-56 text-[#05141B]">
              <img
                src={professionalData.data.avatar}
                alt={professionalData.data.fullName}
                className="rounded-lg"
              />
              <div className="mt-8">
                <div className="justify-between flex">
                  <p>{professionalData.data.profession}</p>
                  {professionalData.data.verified && (
                    <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                      <ShieldCheck size={15} />
                      <p className="text-sm">Verified</p>
                    </div>
                  )}
                </div>
                <h2 className="text-3xl text-black mt-3">
                  {professionalData.data.fullName}
                </h2>
                <div className="flex space-x-4 flex-wrap mt-3 text-gray-950">
                  <div className="flex">
                    <MapPin size={20} color="red" />
                    <span className="ml-2">
                      {professionalData.data.location}
                    </span>
                  </div>
                  <div className="flex">
                    <Star size={20} color="red" />
                    <span className="ml-2">{professionalData.data.rating}</span>
                  </div>
                  <div className="flex">
                    <Separator orientation="vertical" />
                    <span className="ml-2">
                      {professionalData.data.reviews} reviews
                    </span>
                  </div>
                </div>

                <h2 className="my-3 text-xl">Professional Rate</h2>
                <div className="border rounded-lg px-4 py-4">
                  ₦ {professionalData.data.rate.toLocaleString()} per day
                </div>
              </div>
            </aside>
          )}

          <div className="md:col-span-5 mt-10 md:mt-0">
            <h4>Message history</h4>
            <div className="border h-[600px] rounded-lg">
              <div className="flex flex-col h-full w-full">
                <ChatWindow
                  messages={messages.map((msg: Message) => ({
                    text: msg.body,
                    time: new Date(msg.createdAt).toLocaleTimeString(),
                    date: new Date(msg.createdAt).toLocaleDateString(),
                    isOwnMessage: msg.sender === userType,
                    userType: userType,
                    owner: {
                      name:
                        msg.sender === "professional"
                          ? msg.professional.fullName
                          : msg.customer.fullName,
                      avatar:
                        msg.sender === "professional"
                          ? msg.professional.avatar
                          : msg.customer.avatar,
                    },
                    file: msg.selectedFile,
                    delivered: msg.delivered,
                  }))}
                />
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
      </SectionContainer>
    </div>
  );
};

export default SingleProjectPage;
