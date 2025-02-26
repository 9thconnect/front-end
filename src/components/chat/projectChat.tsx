import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatWindow from "@/components/chat/chatWindow";
import ChatInput from "@/components/chat/chatInput";
import requests from "@/utils/requests";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/lib/redux/hooks";

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
  const { socket, isConnected } = useSocket();

  const user = useAppSelector((state) => state.auth);

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
      console.log("receive-message", conversationId, data.message);
      if (
        data.message.conversationId === conversationId &&
        data.message.receiver == user?.type
      ) {
        const newMessage: Message = {
          ...data.message,
          delivered: true,
          status: "delivered",
          professional: conversation.professionalId,
          customer: conversation.customerId,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [socket, conversationId, conversation, user]);

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

      requests
        .get<MessagesResponse>(`chat/${userType}/messages/${convId}`)
        .then((response) => {
          console.log("response.data.messages", response.data);

          if (response.data) {
            setMessages(
              response.data.data.messages.map((msg) => ({
                ...msg,
                delivered: true,
                status: "delivered",
              }))
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
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

      console.log("sending message:", messages);

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
    <div>
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
              status: msg.status,
              tempId: msg.tempId,
            }))}
            handleRemoveMessage={handleRemoveMessage}
            handleRetryMessage={handleRetryMessage}
          />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ProjectChat;
