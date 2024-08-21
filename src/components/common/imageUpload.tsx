// import React, { useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { siteConfig } from "@/config/site.config";
// import { Camera } from "lucide-react";

// type ImageUploadProps = {
//   onUploadSuccess: (url: string) => void;
//   uploadMethod?: "auto" | "button"; // Optional prop to choose upload method
// };

// const ImageUpload = ({
//   onUploadSuccess,
//   uploadMethod = "auto",
// }: ImageUploadProps) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

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
//       const response = await axios.post(
//         `${siteConfig.apiURL}/config/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           maxBodyLength: Infinity,
//           onUploadProgress: (event) => {
//             if (event.total) {
//               setProgress(Math.round((event.loaded * 100) / event.total));
//             }
//           },
//         }
//       );

//       const uploadedImageUrl = response.data.data[0].url;
//       onUploadSuccess(uploadedImageUrl);
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex text-offBlack border-offBlack flex-col items-center border border-dashed py-4 px-10 rounded-xl">
//       <Camera />
//       <p>Click to upload</p>
//       <Input
//         className="my-4 rounded-2xl"
//         type="file"
//         onChange={handleFileChange}
//       />
//       <p>Supports jpg, png and gif</p>
//       {uploadMethod === "button" && (
//         <Button
//           onClick={() => file && handleUpload(file)}
//           disabled={!file || uploading}
//           className="mt-2"
//         >
//           {uploading ? "Uploading..." : "Upload Image"}
//         </Button>
//       )}
//       {uploading && uploadMethod === "auto" && (
//         <div className="w-full mt-2">
//           <div className="relative pt-1">
//             <div className="flex mb-2 items-center justify-between">
//               <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
//                 {progress}%
//               </div>
//             </div>
//             <div className="flex-grow">
//               <div className="relative pt-1">
//                 <div
//                   className="flex mb-2 items-center justify-between"
//                   style={{ width: `${progress}%` }}
//                 >
//                   <div
//                     className="bg-teal-500 text-xs leading-none py-1 text-center text-white rounded-full"
//                     style={{ width: `${progress}%` }}
//                   >
//                     &nbsp;
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site.config";
import { Camera } from "lucide-react";
import { Progress } from "../ui/progress";

type ImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  uploadMethod?: "auto" | "button"; // Optional prop to choose upload method
};

const ImageUpload = ({
  onUploadSuccess,
  uploadMethod = "auto",
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
    } finally {
      setUploading(false);
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
        onChange={handleFileChange}
      />
      <p>Supports jpg, png, and gif</p>
      {uploadMethod === "button" && (
        <Button
          onClick={() => file && handleUpload(file)}
          disabled={!file || uploading}
          className="mt-2"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
      {uploading && uploadMethod === "auto" && (
        <Progress value={progress} className="w-[60%]" />
        // <div className="w-full mt-2">
        //   <div className="relative pt-1">
        //     <div className="flex mb-2 items-center justify-between">
        //       <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
        //         {progress}%
        //       </div>
        //     </div>
        //     <div className="flex-grow">
        //       <div className="relative pt-1">
        //         <div
        //           className="flex mb-2 items-center justify-between"
        //           style={{ width: `${progress}%` }}
        //         >
        //           <div
        //             className="bg-teal-500 text-xs leading-none py-1 text-center text-white rounded-full"
        //             style={{ width: `${progress}%` }}
        //           >
        //             &nbsp;
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default ImageUpload;
