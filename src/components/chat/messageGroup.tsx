"use client";
import React from "react";
import MainBadge from "../badges/mainBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FileDisplay from "./fileDisplay";
import { Check, Clock, ClockAlert } from "lucide-react";

interface MessageProps {
  message: {
    text: string;
    time: string;
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
  };
  isOwnMessage: boolean;
  handleRetryMessage: (tempId?: string) => Promise<void>;
  handleRemoveMessage: (tempId?: string) => void;
}

// const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => (
//   <div
//     className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
//   >
//     <div className="flex">
//       {!isOwnMessage && (
//         <Avatar className="mr-5">
//           <AvatarImage src={message.owner.avatar} />
//           <AvatarFallback>{message.owner.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//       )}
//       <div>
//         <div className={`flex items-center ${isOwnMessage && "justify-end"}`}>
//           <p>{message.owner.name}</p>
//           {message.userType == "professional" && (
//             <p className="text-red-800 ml-2">(professional)</p>
//           )}
//           <span className="text-xs text-gray-500 ml-2">{message.time}</span>
//           {isOwnMessage && (
//             <span className="ml-2">
//               {message.delivered ? (
//                 <Check className="w-4 h-4 text-blue-500" />
//               ) : (
//                 <Clock className="w-4 h-4 text-gray-400" />
//               )}
//             </span>
//           )}
//         </div>

//         <div
//           className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl mt-2 ${
//             isOwnMessage
//               ? "bg-gray-100 text-gray-700"
//               : "bg-gray-50 text-gray-900"
//           }`}
//         >
//           <p>{message.text}</p>
//           {message.file && <FileDisplay file={message.file} />}
//         </div>
//       </div>

//       {isOwnMessage && (
//         <Avatar className="ml-5">
//           <AvatarImage src={message.owner.avatar} />
//           <AvatarFallback>{message.owner.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//       )}
//     </div>
//   </div>
// );

const Message: React.FC<MessageProps> = ({
  message,
  isOwnMessage,
  handleRemoveMessage,
  handleRetryMessage,
}) => (
  <div
    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
  >
    <div className="flex">
      {!isOwnMessage && (
        <Avatar className="mr-5">
          <AvatarImage src={message.owner.avatar} />
          <AvatarFallback>{message.owner.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <div className={`flex items-center ${isOwnMessage && "justify-end"}`}>
          <p>{message.owner.name}</p>
          {message.userType == "professional" && (
            <p className="text-red-800 ml-2">(professional)</p>
          )}
          <span className="text-xs text-gray-500 ml-2">{message.time}</span>
          {isOwnMessage && (
            <div className="flex items-center ml-2">
              {message.status === "delivered" && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
              {message.status === "pending" && (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
              {message.status === "failed" && (
                <div className="flex space-x-2 items-center">
                  <ClockAlert className="w-4 h-4 text-red-700" />

                  <button
                    onClick={() => handleRetryMessage(message.tempId!)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() => handleRemoveMessage(message.tempId!)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl mt-2 ${
            isOwnMessage
              ? "bg-gray-100 text-gray-700"
              : "bg-gray-50 text-gray-900"
          } ${message.status === "failed" ? "opacity-75" : ""}`}
        >
          <p>{message.text}</p>
          {message.file && <FileDisplay file={message.file} />}
        </div>
      </div>

      {isOwnMessage && (
        <Avatar className="ml-5">
          <AvatarImage src={message.owner.avatar} />
          <AvatarFallback>{message.owner.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  </div>
);
interface MessageGroupProps {
  date: string;
  messages: {
    text: string;
    time: string;
    isOwnMessage: boolean;
    userType: string;
    owner: {
      name: string;
      avatar: string;
    };
    delivered?: boolean;
  }[];
  handleRetryMessage: (tempId?: string) => Promise<void>;
  handleRemoveMessage: (tempId?: string) => void;
}
const MessageGroup: React.FC<MessageGroupProps> = ({
  date,
  messages,
  handleRemoveMessage,
  handleRetryMessage,
}) => {
  console.log(messages);

  return (
    <div className="mb-4">
      <div className="text-center text-gray-500 text-xs mb-2 ">
        <MainBadge text={date} type="grey" />{" "}
      </div>
      {messages.map((msg, index) => (
        <Message
          handleRemoveMessage={handleRemoveMessage}
          handleRetryMessage={handleRetryMessage}
          key={index}
          message={msg}
          isOwnMessage={msg.isOwnMessage}
        />
      ))}
    </div>
  );
};

export default MessageGroup;
