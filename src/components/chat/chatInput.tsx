import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { siteConfig } from "@/config/site.config";

interface ChatInputProps {
  onSendMessage: (
    message: string,
    fileInfo?: {
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileSize: number;
      fileFormat: string;
    }
  ) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await axios.post<{
        data: Array<{
          url: string;
          publicId: string;
          name: string;
          mimeType: string;
          fileSize: number;
          fileFormat: string;
        }>;
      }>(`${siteConfig.apiURL}/config/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      const fileInfo = response.data.data[0];
      return {
        fileUrl: fileInfo.url,
        fileName: fileInfo.name,
        fileType: fileInfo.mimeType.split("/")[0],
        fileSize: fileInfo.fileSize,
        fileFormat: fileInfo.fileFormat,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    try {
      let fileInfo;
      if (selectedFile) {
        fileInfo = await uploadFile(selectedFile);
      }

      onSendMessage(message, fileInfo);
      setMessage("");
      handleRemoveFile();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 px-4">
      {selectedFile && (
        <div className="mb-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Paperclip className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{selectedFile.name}</span>
          </div>
          {isUploading ? (
            <div className="w-1/3">
              <Progress value={uploadProgress} className="h-2" />
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Button
          type="submit"
          disabled={(!message.trim() && !selectedFile) || isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
