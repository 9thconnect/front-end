"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/common/imageUpload";
import { ArrowLeft, X, FileText, Image as ImageIcon } from "lucide-react";

const portfolioItemSchema = z.object({
  imageUrl: z.string().url("Invalid image URL"),
});

const portfolioValidationSchema = z.object({
  portfolio: z.array(portfolioItemSchema),
});

type PortfolioItemSchema = z.infer<typeof portfolioItemSchema>;
export type PortfolioValidationSchema = z.infer<
  typeof portfolioValidationSchema
>;

const getFileType = (url: string): "image" | "pdf" | "word" | "other" => {
  console.log(url);

  const extension = url.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "image";
  if (extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension || "")) return "word";
  return "other";
};

const renderPortfolioItem = (url: string, index: number) => {
  const fileType = getFileType(url);
  switch (fileType) {
    case "image":
      return (
        <img
          src={url}
          alt={`Portfolio item ${index + 1}`}
          className="w-full h-auto"
        />
      );
    case "pdf":
      return (
        <div className="flex items-center">
          <FileText className="mr-2" />
          <a href={url} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </div>
      );
    case "word":
      return (
        <div className="flex items-center">
          <FileText className="mr-2" />
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Word Document
          </a>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <FileText className="mr-2" />
          <a href={url} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      );
  }
};

interface PortfolioFormProps {
  onSubmit: (data: PortfolioValidationSchema) => void;
  formStateData: {
    portfolio?: string[];
  };
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  onSubmit,
  formStateData,
  setStage,
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const form = useForm<PortfolioValidationSchema>({
    resolver: zodResolver(portfolioValidationSchema),
    defaultValues: {
      portfolio:
        formStateData.portfolio?.map((url) => ({ imageUrl: url })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portfolio",
  });

  const handleAddPortfolioItem = () => {
    setIsAdding(true);
  };

  const handleUploadSuccess = (url: string) => {
    append({ imageUrl: url });
    setIsAdding(false);
  };

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage((prevStage) => prevStage - 1)}
      />
      <h2 className="my-2 text-xl text-black">Add your portfolio items</h2>
      <Separator className="mb-4" />

      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border rounded-2xl">
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="outline"
            size="sm"
            className="ml-auto flex justify-center h-7 w-7 p-1 items-center rounded-full bg-red-50 mb-4"
          >
            <X color="red" />
          </Button>
          {renderPortfolioItem(field.imageUrl, index)}
          {/* <img
            src={field.imageUrl}
            alt={`Portfolio item ${index + 1}`}
            className="w-full h-auto"
          /> */}
        </div>
      ))}

      {isAdding ? (
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
      ) : (
        <Button className="w-full" onClick={handleAddPortfolioItem}>
          Add Portfolio Item
        </Button>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PortfolioForm;
