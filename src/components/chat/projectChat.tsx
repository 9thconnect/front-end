"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatWindow from "@/components/chat/chatWindow";
import ChatInput from "@/components/chat/chatInput";
import requests from "@/utils/requests";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/lib/redux/hooks";
import { ArrowBigLeftIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
  status?: "pending" | "failed" | "delivered";
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

interface ProjectChatProps {
  projectId: string;
  userType: UserType;
}

const ProjectChat: React.FC<ProjectChatProps> = ({ projectId, userType }) => {
  const [conversationId, setConversationId] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { socket, isConnected } = useSocket();

  const user = useAppSelector((state) => state.auth);

  const router = useRouter();

  const isOwnerOfMessage = () => {
    if (userType == UserType.VENDOR) {
      return "professional";
    } else {
      return "customer";
    }
  };

  // Fetch conversation list
  const {
    data: conversationData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", projectId],
    queryFn: () =>
      requests.get<ConversationResponse>(
        `chat/${userType}/conversation-list?pageNumber=1`
      ),
  });

  useEffect(() => {
    if (!socket || !conversation) return;

    const handleNewMessage = (data: { message: Message }) => {
      if (
        data.message.conversationId === conversationId &&
        data.message.receiver == isOwnerOfMessage()
      ) {
        const newMessage: Message = {
          ...data.message,
          delivered: true,
          status: "delivered",
          professional: conversation.professionalId,
          customer: conversation.customerId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [socket, conversationId, conversation, user]);

  const fetchMessages = async (convId: string, page: number = 1) => {
    // Don't fetch if we're already loading or if we're trying to load a page beyond the total
    if (isLoadingMore || (page > totalPages && totalPages > 0)) return;

    setIsLoadingMore(true);
    try {
      const response = await requests.get<MessagesResponse>(
        `chat/${userType}/messages/${convId}?pageNumber=${page}`
      );

      if (response.data) {
        const formattedMessages = response.data.data.messages.map((msg) => ({
          ...msg,
          delivered: true,
          status: "delivered" as any,
        }));

        if (page === 1) {
          setMessages(formattedMessages);
        } else {
          // Add older messages to the beginning
          setMessages((prev) => [...formattedMessages, ...prev]);
        }

        setTotalPages(response.data.data.pages);
        setCurrentPage(response.data.data.page);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMoreMessages = () => {
    if (currentPage < totalPages && !isLoadingMore && conversationId) {
      fetchMessages(conversationId, currentPage + 1);
    }
  };

  useEffect(() => {
    if (
      !isError &&
      !isLoading &&
      conversationData &&
      conversationData.data &&
      conversationData.data.data.conversations.length > 0
    ) {
      const selectedConversation =
        conversationData.data.data.conversations.find(
          (conversation) => conversation.project._id === projectId
        );

      if (!selectedConversation) return;
      const convId = selectedConversation._id;
      setConversationId(convId);
      setConversation(selectedConversation);

      // Reset pagination state when conversation changes
      setCurrentPage(1);
      setTotalPages(1);
      setMessages([]);

      // Initial fetch of messages
      fetchMessages(convId, 1);
    }
  }, [conversationData, isError, isLoading, userType, projectId]);

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
    if (!conversationId || !conversation) return;

    const tempId = Date.now().toString();
    const tempMessage: Message = {
      _id: tempId,
      conversationId,
      body: messageText,
      sender: userType === UserType.CUSTOMER ? "customer" : "professional",
      receiver: userType === UserType.CUSTOMER ? "professional" : "customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isRead: false,
      delivered: false,
      status: "pending",
      tempId,
      professional: {
        _id: conversation.professionalId._id,
        fullName: conversation.professionalId.fullName,
        vendorID: conversation.professionalId.vendorID,
        avatar: conversation.professionalId.avatar,
      },
      customer: {
        _id: conversation.customerId._id,
        fullName: conversation.customerId.fullName,
        avatar: conversation.customerId.avatar,
      },
      selectedFile: fileInfo,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      await requests.post(`chat/${userType}/message`, {
        body: messageText,
        conversationId,
        selectedFile: fileInfo,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId
            ? { ...tempMessage, delivered: true, status: "delivered" }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleRetryMessage = async (tempId?: string) => {
    if (!tempId) return;
    const messageToRetry = messages.find((msg) => msg.tempId === tempId);
    if (!messageToRetry) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.tempId === tempId ? { ...msg, status: "pending" } : msg
      )
    );

    try {
      await requests.post(`chat/${userType}/message`, {
        body: messageToRetry.body,
        conversationId,
        selectedFile: messageToRetry.selectedFile,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId
            ? { ...msg, delivered: true, status: "delivered" }
            : msg
        )
      );
    } catch (error) {
      console.error("Error retrying message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleRemoveMessage = (tempId?: string) => {
    if (!tempId) return;
    setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <div className="flex items-center ml-2">
          <img
            src={
              userType === UserType.CUSTOMER
                ? conversation?.professionalId.avatar ||
                  `https://fakeimg.pl/600x192?text=loading`
                : conversation?.customerId.avatar ||
                  `https://fakeimg.pl/600x192?text=loading`
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2 text-sm text-gray-500">
            {userType === UserType.CUSTOMER
              ? conversation?.professionalId.fullName || "Loading..."
              : conversation?.customerId.fullName || "Loading..."}
          </span>
        </div>

        <Button onClick={() => router.back()} size="sm">
          <ArrowLeftIcon size={16} />
          Back
        </Button>
      </div>

      <div className="border h-[calc(100vh-150px)] rounded-lg">
        <div className="flex flex-col h-full w-full">
          <ChatWindow
            messages={messages.map((msg: Message) => {
              const createdAt = new Date(msg.createdAt); // Assuming createdAt is a valid date string or timestamp
              return {
                text: msg.body,
                time: createdAt.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // 24-hour format like HH:mm:ss
                }), // e.g., "14:23:45"
                date: createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }), // e.g., "09/04/2025"
                isOwnMessage: msg.sender === isOwnerOfMessage(),
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
                status: msg.status,
                tempId: msg.tempId,
              };
            })}
            handleRemoveMessage={handleRemoveMessage}
            handleRetryMessage={handleRetryMessage}
            onLoadMore={handleLoadMoreMessages}
            hasMore={currentPage < totalPages}
            isLoading={isLoadingMore}
          />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ProjectChat;
