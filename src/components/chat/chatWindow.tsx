"use client";

import React, { useEffect, useRef } from "react";
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
  delivered?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  handleRetryMessage: (tempId?: string) => Promise<void>;
  handleRemoveMessage: (tempId?: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  handleRemoveMessage,
  handleRetryMessage,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current?.scrollTop === 0) {
      // Fetch more messages when scrolled to the top
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Helper function to convert DD/MM/YYYY to a Date object
  const parseDate = (dateStr: string, timeStr: string = "00:00:00") => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}T${timeStr}`);
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

  console.log(
    "groupedMessages",
    groupedMessages,
    "sortedGroupedMessages",
    sortedGroupedMessages
  );

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col h-full overflow-y-auto p-4 space-y-4"
    >
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
