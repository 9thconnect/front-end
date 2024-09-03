"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

interface ChatInputProps {
  onSendMessage: (messageText: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center mt-8">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2  rounded-lg border"
        placeholder="Type your message..."
      />
      <Button onClick={handleSendMessage} className="ml-3 px-7">
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
