"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageGroup from "./messageGroup";

interface Message {
  text: string;
  time: string;
  date: string;
  isOwnMessage: boolean;
  userType: string;
  owner: {
    name: string;
    avatar: string;
  };
  file?: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileFormat: string;
  };
  delivered?: boolean;
  status?: "pending" | "failed" | "delivered";
  tempId?: string;
}

interface ChatWindowProps {
  messages: Message[];
  handleRetryMessage: (tempId?: string) => Promise<void>;
  handleRemoveMessage: (tempId?: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  handleRemoveMessage,
  handleRetryMessage,
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const scrollThreshold = 50; // Pixel threshold near the top to trigger loading
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);

  const isNearBottom = () => {
    if (!scrollRef.current) return false;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Consider "near bottom" if within 100px of the bottom
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  useEffect(() => {
    // On initial load, scroll to bottom
    if (scrollRef.current && initialLoad && messages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setInitialLoad(false);
    }
  }, [messages, initialLoad]);

  const handleScroll = () => {
    if (scrollRef.current) {
      // If scrolled to near the top and more messages are available, load more
      if (
        scrollRef.current.scrollTop <= scrollThreshold &&
        hasMore &&
        !isLoading
      ) {
        setPrevScrollHeight(scrollRef.current.scrollHeight);
        onLoadMore();
      }
    }
  };

  const parseDate = (dateStr: string, timeStr: string = "00:00:00") => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);

    // Create date using UTC to avoid timezone issues
    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  };

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups: Record<string, Message[]>, message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {}
  );

  // Sort dates in ascending order (oldest to newest)
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => parseDate(a).getTime() - parseDate(b).getTime()
  );

  console.log("sortedDates", sortedDates);
  console.log("groupedMessages", groupedMessages);
  console.log("messages", messages);

  // Sort messages within each date group by time
  const sortedGroupedMessages = sortedDates.map((date) => ({
    date,
    messages: groupedMessages[date].sort((a, b) => {
      // Sort in ascending order (oldest first)
      return (
        parseDate(a.date, a.time).getTime() -
        parseDate(b.date, b.time).getTime()
      );
    }),
  }));

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col h-full overflow-y-auto p-4 space-y-4"
    >
      {isLoading && (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {sortedGroupedMessages.map((group, index) => (
        <MessageGroup
          key={group.date}
          date={group.date}
          messages={group.messages}
          handleRetryMessage={handleRetryMessage}
          handleRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
