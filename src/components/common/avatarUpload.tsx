"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { profileValidationSchema } from "../forms/profile/profileValidator";
import { siteConfig } from "@/config/site.config";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import requests from "@/utils/requests";
import { updateAvatar } from "@/lib/redux/features/auth/authSlice";
import { toast } from "sonner";

export type ProfileFormValues = z.infer<typeof profileValidationSchema>;

interface AvatarUploadProps {
  form: UseFormReturn<ProfileFormValues>;
  defaultAvatar?: string | null;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ form, defaultAvatar }) => {
  const [preview, setPreview] = useState<string>(defaultAvatar || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const type = useAppSelector((state) => state.auth.type);

  const handleImageClick = (): void => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const dispatch = useAppDispatch();

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
      setPreview(uploadedImageUrl);

      let profileUploadDate = await requests.put(`/${type}/update-my-profile`, {
        avatar: uploadedImageUrl,
      });

      console.log(profileUploadDate);

      toast.success("Avatar updated successfully");

      dispatch(updateAvatar(uploadedImageUrl));

      return uploadedImageUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Show local preview immediately
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const result = event.target?.result;
          if (typeof result === "string") {
            setPreview(result);
          }
        };
        reader.readAsDataURL(file);

        // Start upload
        await handleUpload(file);
      } catch (error) {
        // Revert to previous preview if upload fails
        setPreview(defaultAvatar || "");
        console.error("Failed to handle file:", error);
      }
    }
  };

  return (
    <FormField
      name="avatar"
      render={({ field: { ref, onChange, value, ...fieldProps } }) => (
        <FormItem className="flex flex-col items-center space-y-4">
          <FormControl>
            <div className="relative">
              <Avatar
                className="h-24 w-24 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleImageClick}
              >
                <AvatarImage src={preview} alt="Avatar preview" />
                <AvatarFallback className="bg-gray-100">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                {...fieldProps}
              />
            </div>
          </FormControl>

          {uploading && (
            <div className="w-full max-w-xs">
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleImageClick}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Change Avatar"}
          </Button>
        </FormItem>
      )}
    />
  );
};

export default AvatarUpload;
