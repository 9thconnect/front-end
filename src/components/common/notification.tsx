"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clipboard,
  DollarSign,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/type/notification";
import { truncateText } from "@/utils/common";
import MainBadge from "../badges/mainBadge";
import { Separator } from "@radix-ui/react-separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

const getNotificationIcon = (notification: Notification) => {
  switch (notification.notificationType) {
    case "offer":
      return notification.message.includes("REJECTED") ? (
        <XCircle className="text-red-500" size={24} />
      ) : (
        <CheckCircle2 className="text-green-500" size={24} />
      );
    case "project":
      return <CheckCircle2 className="text-blue-500" size={24} />;
    default:
      return <Bell className="text-gray-500" size={24} />;
  }
};

export const NotificationItem = ({
  notification,
  onNotificationClick,
}: {
  notification: Notification;
  onNotificationClick: (notification: Notification) => void;
}) => {
  const getSenderAvatar = () => {
    let sender;

    if (notification.ownerType === "customer") {
      console.log(notification.vendorFrom, notification.customerTo);

      // For customer owner type, prioritize vendorFrom, then fall back to professional
      sender = notification.vendorFrom || notification.customerTo;
    } else {
      // For non-customer owner type, prioritize customerFrom, then fall back to customer
      sender = notification.customerFrom || notification.customer;
    }

    return {
      src: sender?.avatar || "",
      fallback: sender?.fullName?.charAt(0) || "N/A",
    };
  };

  const getSenderFullName = () => {
    let senderFullName;

    if (notification.ownerType === "customer") {
      // For customer owner type, prioritize vendorFrom's fullName, then fall back to professional's fullName
      senderFullName =
        notification.vendorFrom?.fullName || notification.customerTo?.fullName;
    } else {
      // For non-customer owner type, prioritize customerFrom's fullName, then fall back to customer's fullName
      senderFullName =
        notification.customerFrom?.fullName || notification.customer?.fullName;
    }

    return senderFullName || "N/A";
  };

  const avatarInfo = getSenderAvatar();

  return (
    <Card
      className="mb-4 hover:bg-gray-50 transition-colors duration-200"
      onClick={() => onNotificationClick(notification)}
    >
      <CardContent className="flex items-center p-4 space-x-4">
        <Avatar>
          <AvatarImage src={avatarInfo.src} alt="Sender Avatar" />
          <AvatarFallback>{avatarInfo.fallback}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm">{getSenderFullName()}</h3>
            <MainBadge
              type={
                notification.message.includes("REJECTED")
                  ? "red"
                  : notification.message.includes("ACCEPTED")
                  ? "green"
                  : "grey"
              }
              className="text-xs"
              text={notification.notificationType.toUpperCase()}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {truncateText(notification.message, 100)}
          </p>
          {notification.project?.approvedPrice && (
            <div className="text-xs text-gray-500 mt-1">
              Price: ₦{notification.project.approvedPrice.toLocaleString()}
            </div>
          )}
        </div>

        <div className="ml-auto">{getNotificationIcon(notification)}</div>
      </CardContent>
    </Card>
  );
};

export const NotificationsList = ({
  notifications,
  count,
}: {
  notifications: Notification[];
  count: number;
}) => {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };
  return (
    <div className="mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge variant="outline">{count} Total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onNotificationClick={handleNotificationClick}
            />
          ))}
        </CardContent>
      </Card>
      {selectedNotification && (
        <NotificationDetailDrawer
          notification={selectedNotification}
          open={!!selectedNotification}
          onOpenChange={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
};

const NotificationDetailDrawer = ({
  notification,
  open,
  onOpenChange,
}: {
  notification: Notification;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!notification) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center space-x-2">
            {getNotificationIcon(notification)}
            <span>Notification Details</span>
          </SheetTitle>
        </SheetHeader>

        {/* Sender Information */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                notification.vendorFrom?.avatar ||
                notification.customerTo?.avatar
              }
              alt="Sender Avatar"
            />
            <AvatarFallback>
              {/* {(
                notification.vendorFrom?.fullName ||
                notification.customerTo?.fullName
              )
                .split(" ")
                .map((name) => name[0])
                .join("")} */}
              AA
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold mb-2">
              {notification.vendorFrom?.fullName ||
                notification.customerTo?.fullName}
            </h3>
            <MainBadge
              type={
                notification.message.includes("REJECTED")
                  ? "red"
                  : notification.message.includes("ACCEPTED")
                  ? "green"
                  : "grey"
              }
              className="text-xs"
              text={notification.notificationType.toUpperCase()}
            />
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Notification Message */}
        <div className="my-4">
          <p className="text-sm text-gray-700">{notification.message}</p>
        </div>

        <Separator className="mb-4" />

        {notification.offer && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium">Offer Details</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-500" />
                <span>
                  Proposed Price: ₦
                  {notification.offer.proposedPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle2
                  size={16}
                  className={
                    notification.offer.status === "accepted"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                />
                <span>Status: {notification.offer.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Project Details (if available) */}
        {notification.project && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium">Project Details</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clipboard size={16} className="text-gray-500" />
                <span>Project ID: {notification.project.projectID}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-500" />
                <span>
                  Approved Price: ₦
                  {notification.project.approvedPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} className="text-blue-500" />
                <span>
                  Profession:{" "}
                  {notification.profession?.professionName || "Not Specified"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-purple-500" />
                <span>Date: {formatDate(notification.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2
                  size={16}
                  className={
                    notification.project.status === "completed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                />
                <span>Status: {notification.project.status.toUpperCase()}</span>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Project Description</h5>
              <p className="text-sm text-gray-600">
                {notification.project.projectDescription}
              </p>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex justify-end space-x-2">
          {notification.project && (
            <Link href={`/hire/projects/${notification.project._id}`}>
              <Button>View Message</Button>
            </Link>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
