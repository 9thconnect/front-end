"use client";

import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  BellDot,
  X,
  Award,
  Briefcase,
  Package,
  TrendingUp,
  Wallet,
  CreditCard,
  UserCheck,
  MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";

// Type mapping for icons
const notificationIcons = {
  offer: Award,
  project: Briefcase,
  product: Package,
  profession: TrendingUp,
  business: Briefcase,
  wallet: Wallet,
  transaction: CreditCard,
  default: UserCheck,
  chat: MessageSquareIcon,
};

interface NotificationData {
  id: string;
  message: string;
  notificationType?:
    | "offer"
    | "project"
    | "product"
    | "profession"
    | "business"
    | "wallet"
    | "transaction"
    | "chat";
  ownerType: "vendor" | "customer";
  vendorTo: string;
  customerTo: string;
}

const SocketNotificationListener: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);

  const user = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
      forceNew: true,
      timeout: 5000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("in-app-notification", (data: NotificationData) => {
      console.log("Received in-app notification:", data);

      const shouldShowNotification =
        (user && data.ownerType === "vendor" && data.vendorTo === user._id) ||
        (user && data.ownerType === "customer" && data.customerTo === user._id);

      if (shouldShowNotification) {
        if (!currentNotification) {
          setCurrentNotification(data);
        } else {
          setNotifications((prev) => [
            ...prev,
            {
              ...data,
              id: data.id || Math.random().toString(36).substr(2, 9),
            },
          ]);
        }
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, currentNotification]);

  const handleDismissNotification = useCallback(() => {
    if (notifications.length > 0) {
      const [nextNotification, ...remainingNotifications] = notifications;
      setCurrentNotification(nextNotification);
      setNotifications(remainingNotifications);
    } else {
      setCurrentNotification(null);
    }
  }, [notifications]);

  if (!currentNotification) return null;

  // Safely resolve the icon, defaulting to UserCheck if invalid
  const notificationType = currentNotification.notificationType || "default";
  const NotificationIcon = notificationIcons[notificationType] || UserCheck;

  return (
    <Dialog
      open={!!currentNotification && notificationType !== "chat"}
      onOpenChange={() => handleDismissNotification()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="capitalize flex items-center">
              <NotificationIcon
                size={24}
                className={`mr-2 ${
                  notificationType === "transaction"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              />
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismissNotification}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="mt-2">
            {currentNotification.message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4 space-x-4">
          <Link
            href="/account/notifications"
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Notifications
          </Link>
          <Button variant="outline" onClick={handleDismissNotification}>
            Dismiss
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocketNotificationListener;
