// "use client";

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { siteConfig } from "@/config/site.config";
// import { Camera } from "lucide-react";
// import { Progress } from "../ui/progress";
// import { UploadData } from "@/type/common";

// type ImageUploadProps = {
//   onUploadSuccess: (data: UploadData) => void;
//   uploadMethod?: "auto" | "button";
// };

// const FileUpload = ({
//   onUploadSuccess,
//   uploadMethod = "auto",
// }: ImageUploadProps) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedFile = event.target.files[0];
//       setFile(selectedFile);
//       if (uploadMethod === "auto") {
//         await handleUpload(selectedFile);
//       }
//     }
//   };

//   const handleUpload = async (file: File) => {
//     setUploading(true);
//     setProgress(0);
//     const formData = new FormData();
//     formData.append("upload", file);

//     try {
//       const response = await axios.post<{
//         data: Array<{
//           url: string;
//           publicId: string;
//           name: string;
//           mimeType: string;
//           fileSize: number;
//           fileFormat: string;
//         }>;
//       }>(`${siteConfig.apiURL}/config/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         maxBodyLength: Infinity,
//         onUploadProgress: (event) => {
//           if (event.total) {
//             setProgress(Math.round((event.loaded * 100) / event.total));
//           }
//         },
//       });

//       const uploadedImageUrl = response.data.data[0].url;

//       console.log("response from server upload:", response);

//       console.log("url from server", uploadedImageUrl);

//       onUploadSuccess(response.data.data[0]);
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDivClick = (e: React.MouseEvent) => {
//     // Only trigger if the click is directly on the div, not on its children
//     if (e.target === e.currentTarget) {
//       fileInputRef.current?.click();
//     }
//   };

//   return (
//     <div
//       className="flex text-offBlack border-offBlack flex-col items-center  cursor-pointer"
//       onClick={handleDivClick}
//     >
//       <Camera />
//       <p>Click to upload</p>
//       <Input
//         ref={fileInputRef}
//         className="my-4 rounded-2xl"
//         type="file"
//         onChange={handleFileChange}
//         onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
//       />
//       <p>Supports jpg, png, pdf, excel, docx...</p>
//       {uploadMethod === "button" && (
//         <Button
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent click from bubbling up
//             file && handleUpload(file);
//           }}
//           disabled={!file || uploading}
//           className="mt-2"
//         >
//           {uploading ? "Uploading..." : "Upload Image"}
//         </Button>
//       )}
//       {uploading && uploadMethod === "auto" && (
//         <Progress value={progress} className="w-[60%]" />
//       )}
//     </div>
//   );
// };

// export default FileUpload;

"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site.config";
import { Camera } from "lucide-react";
import { Progress } from "../ui/progress";
import { UploadData } from "@/type/common";

type ImageUploadProps = {
  onUploadSuccess: (data: UploadData) => void;
  uploadMethod?: "auto" | "button";
  disabled?: boolean;
};

const FileUpload = ({
  onUploadSuccess,
  uploadMethod = "auto",
  disabled,
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      if (uploadMethod === "auto") {
        await handleUpload(selectedFile);
      }
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("upload", file);

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
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      const uploadedImageUrl = response.data.data[0].url;
      console.log("response from server upload:", response);
      console.log("url from server", uploadedImageUrl);

      // Clear the file input after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(null);

      onUploadSuccess(response.data.data[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDivClick = (e: React.MouseEvent) => {
    // Only trigger if the click is directly on the div, not on its children
    if (e.target === e.currentTarget) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className="flex text-offBlack border-offBlack flex-col items-center mt-2  cursor-pointer"
      onClick={handleDivClick}
    >
      <Camera />
      <p>Click to upload</p>
      <Input
        ref={fileInputRef}
        className="my-4 rounded-2xl"
        type="file"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
        disabled={disabled}
      />
      <p>Supports jpg, png, pdf, excel, docx...</p>
      {uploadMethod === "button" && (
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from bubbling up
            file && handleUpload(file);
          }}
          disabled={!file || uploading || disabled}
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

export default FileUpload;
