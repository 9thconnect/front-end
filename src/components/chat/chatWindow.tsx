// "use client";

// import React, { useEffect, useRef } from "react";
// import MessageGroup from "./messageGroup";

// interface ChatWindowProps {
//   messages: {
//     text: string;
//     time: string;
//     date: string;
//     isOwnMessage: boolean;
//     owner: {
//       name: string;
//       avatar: string;
//     };
//   }[];
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleScroll = () => {
//     if (scrollRef.current?.scrollTop === 0) {
//       // Fetch more messages when scrolled to the top
//     }
//   };

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const groupedMessages = messages.reduce((groups, message) => {
//     const date = message.date;
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(message);
//     return groups;
//   }, {} as Record<string, ChatWindowProps["messages"]>);

//   // Sort messages within each date group by time
//   const sortedGroupedMessages = Object.keys(groupedMessages).map((date) => ({
//     date,
//     messages: groupedMessages[date].sort(
//       (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
//     ),
//   }));

//   console.log(sortedGroupedMessages);

//   return (
//     <div
//       ref={scrollRef}
//       onScroll={handleScroll}
//       className="flex flex-col-reverse overflow-y-auto h-full p-4 bg-white rounded-lg"
//     >
//       {sortedGroupedMessages.map((group, index) => (
//         <MessageGroup key={index} date={group.date} messages={group.messages} />
//       ))}
//     </div>
//   );
// };

// export default ChatWindow;

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
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
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
        />
      ))}
    </div>
  );
};

export default ChatWindow;
