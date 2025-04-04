"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site.config";
import { Camera } from "lucide-react";
import { Progress } from "../ui/progress";

type ImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  uploadMethod?: "auto" | "button";
  acceptedTypes?: string;
};

const ImageUpload = ({
  onUploadSuccess,
  uploadMethod = "auto",
  acceptedTypes = "image/jpeg,image/png,image/gif",
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const allowedTypes = acceptedTypes.split(",");
    if (!allowedTypes.includes(file.type)) {
      setError(
        `File type ${
          file.type
        } is not supported. Please upload ${allowedTypes.join(", ")}`
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        if (uploadMethod === "auto") {
          await handleUpload(selectedFile);
        }
      } else {
        event.target.value = "";
        setFile(null);
      }
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("upload", file);

    try {
      const response = await axios.post(
        `${siteConfig.apiURL}/config/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity,
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((event.loaded * 100) / event.total));
            }
          },
        }
      );

      const uploadedImageUrl = response.data.data[0].url;
      onUploadSuccess(uploadedImageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDivClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className="flex text-offBlack border-offBlack flex-col items-center border border-dashed py-4 px-10 rounded-xl cursor-pointer"
      onClick={handleDivClick}
    >
      <Camera />
      <p>Click to upload</p>
      <Input
        ref={fileInputRef}
        className="my-4 rounded-2xl"
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
      />
      <p>Supports {acceptedTypes.split(",").join(", ")}</p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {uploadMethod === "button" && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            file && handleUpload(file);
          }}
          disabled={!file || uploading}
          className="mt-2"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
      {uploading && uploadMethod === "auto" && (
        <Progress value={progress} className="w-[60%]" />
      )}
    </div>
  );
};

export default ImageUpload;
