import React from "react";
import { FileIcon, ImageIcon, VideoIcon, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FileDisplayProps {
  file: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileFormat: string;
  };
}

const FileDisplay = ({ file }: FileDisplayProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderFilePreview = () => {
    switch (file.fileType) {
      case "photos":
        return (
          <div className="relative w-full max-w-sm">
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        );
      case "videos":
        return (
          <div className="relative w-full max-w-sm">
            <video controls className="w-full h-auto rounded-lg">
              <source src={file.fileUrl} type={`video/${file.fileFormat}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-gray-500" />
            <span className="text-sm text-gray-700">{file.fileName}</span>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-sm my-2">
      <CardContent className="p-4">
        {renderFilePreview()}
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span>{formatFileSize(file.fileSize)}</span>
          <a
            href={file.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Download
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileDisplay;
