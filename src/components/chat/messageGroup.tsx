"use client";
import React from "react";
import MainBadge from "../badges/mainBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MessageProps {
  message: {
    text: string;
    time: string;
    isOwnMessage: boolean;
    owner: {
      name: string;
      avatar: string;
    };
  };
  isOwnMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => (
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
        <div className={`flex items-center ${isOwnMessage && "justify-end "} `}>
          <p>{message.owner.name}</p>{" "}
          {isOwnMessage && <p className="text-red-800 ml-2">(professional)</p>}
          <span className="text-xs text-gray-500 ml-2">{message.time}</span>
        </div>

        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl mt-2 ${
            isOwnMessage
              ? "bg-gray-100 text-gray-700"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <p>{message.text}</p>
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
    owner: {
      name: string;
      avatar: string;
    };
  }[];
}

const MessageGroup: React.FC<MessageGroupProps> = ({ date, messages }) => (
  <div className="mb-4">
    <div className="text-center text-gray-500 text-xs mb-2 ">
      <MainBadge text={date} type="grey" />{" "}
    </div>
    {messages.map((msg, index) => (
      <Message key={index} message={msg} isOwnMessage={msg.isOwnMessage} />
    ))}
  </div>
);

export default MessageGroup;
