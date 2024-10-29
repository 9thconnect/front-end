"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdminSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["superAdmin", "product", "order", "accounting", "diplomacy"]),
  isActive: z.boolean().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type Admin = z.infer<typeof AdminSchema>;

type AdminFormProps = {
  admin?: Admin;
  onSubmit: (data: Admin) => Promise<void>;
  onClose: () => void;
};

const AdminForm: React.FC<AdminFormProps> = ({ admin, onSubmit, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    fullName: "",
    username: "",
    email: "",
    role: "accounting" as const,
    isActive: true,
    phone: "",
  };

  const form = useForm<Admin>({
    resolver: zodResolver(AdminSchema),
    defaultValues: admin || defaultValues,
  });

  const handleSubmit = async (data: Admin) => {
    setIsLoading(true);
    try {
      await onSubmit({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        role: data.role,
        // isActive: data.isActive,
        phone: data.phone,
      });

      form.reset(defaultValues);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superAdmin">Super Admin</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="order">Order</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="diplomacy">Diplomacy</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-4">
              <FormLabel>Is Active</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-auto" disabled={isLoading}>
          {isLoading ? "Loading" : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
