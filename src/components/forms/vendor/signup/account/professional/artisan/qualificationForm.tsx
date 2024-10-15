"use client";
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Control,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, X } from "lucide-react";

const qualificationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institute: z.string().min(1, "Institute is required"),
  year: z.string().min(1, "Year is required"),
});

const qualificationValidationSchema = z.object({
  qualifications: z.array(qualificationSchema),
});

type QualificationSchema = z.infer<typeof qualificationSchema>;
export type QualificationValidationSchema = z.infer<
  typeof qualificationValidationSchema
>;

interface QualificationFormProps {
  onSubmit: SubmitHandler<QualificationValidationSchema>;
  formStateData: {
    qualifications?: QualificationSchema[];
  };
  setStage: React.Dispatch<React.SetStateAction<number>>;
  previousStage: number;
}

const QualificationForm: React.FC<QualificationFormProps> = ({
  onSubmit,
  formStateData,
  setStage,
  previousStage,
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const form = useForm<QualificationValidationSchema>({
    resolver: zodResolver(qualificationValidationSchema),
    defaultValues: {
      qualifications: formStateData.qualifications || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "qualifications",
  });

  const handleAddQualification = () => {
    setIsAdding(true);
  };

  const handleSaveQualification = (newQualification: QualificationSchema) => {
    append(newQualification);
    setIsAdding(false);
  };

  const NewQualificationForm = ({
    onSave,
  }: {
    onSave: (data: QualificationSchema) => void;
  }) => {
    const newQualificationForm = useForm<QualificationSchema>({
      resolver: zodResolver(qualificationSchema),
    });

    return (
      <form
        onSubmit={newQualificationForm.handleSubmit(onSave)}
        className="space-y-4"
      >
        <FormField
          control={newQualificationForm.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newQualificationForm.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newQualificationForm.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Qualification</Button>
        <Button
          type="button"
          onClick={() => setIsAdding(false)}
          variant="outline"
        >
          Cancel
        </Button>
      </form>
    );
  };

  return (
    <Form {...form}>
      <ArrowLeft
        className="text-black cursor-pointer"
        onClick={() => setStage(previousStage)}
      />
      <h2 className="my-2 text-xl text-black">Add your qualifications</h2>
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
          <div className="flex justify-between items-center">
            <p>Degree: </p>
            <p>{field.degree}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Institute: </p>
            <p>{field.institute}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Year: </p>
            <p>{field.year}</p>
          </div>
        </div>
      ))}

      {isAdding ? (
        <NewQualificationForm onSave={handleSaveQualification} />
      ) : (
        <Button className="w-full" onClick={handleAddQualification}>
          Add Qualification
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

export default QualificationForm;
