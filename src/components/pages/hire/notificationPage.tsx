"use client";

import Empty from "@/components/common/empty";
import { NotificationsList } from "@/components/common/notification";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/lib/redux/hooks";
import { Notification } from "@/type/notification";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const NotificationPage = () => {
  const [page, setPage] = useState(1);

  const type = useAppSelector((auth) => auth.auth.type);

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["notifications", { type }],
    queryFn: () =>
      requests.get<{
        page: number;
        pages: number;
        count: number;
        notifications: Notification[];
      }>(`${type}/notifications?pageNumber=${page}`),
  });

  const NotificationItemSkeleton = () => {
    return (
      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="">
          {[...Array(12)].map((_, index) => (
            <NotificationItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-8 text-red-500">
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching data."}
        </div>
      );
    }

    if (!data?.data?.notifications || data.data.notifications.length === 0) {
      return (
        <div className="text-center py-8">
          <Empty size={150} text="No notifications yet." />
        </div>
      );
    }

    return (
      <NotificationsList
        count={data.data.count}
        notifications={data.data.notifications}
      />
    );
  };

  return <>{renderContent()}</>;
};

export default NotificationPage;
