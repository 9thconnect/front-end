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

//   const sortedGroupedMessages = Object.keys(groupedMessages).map((date) => ({
//     date,
//     messages: groupedMessages[date].sort(
//       (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
//     ),
//   }));

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

interface ChatWindowProps {
  messages: {
    text: string;
    time: string;
    date: string;
    isOwnMessage: boolean;
    owner: {
      name: string;
      avatar: string;
    };
  }[];
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

  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, ChatWindowProps["messages"]>);

  // Sort messages within each date group by time
  const sortedGroupedMessages = Object.keys(groupedMessages).map((date) => ({
    date,
    messages: groupedMessages[date].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    ),
  }));

  console.log(sortedGroupedMessages);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col-reverse overflow-y-auto h-full p-4 bg-white rounded-lg"
    >
      {sortedGroupedMessages.map((group, index) => (
        <MessageGroup key={index} date={group.date} messages={group.messages} />
      ))}
    </div>
  );
};

export default ChatWindow;
