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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogLoading } from "@/components/common/dialogLoading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import requests from "@/utils/requests";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Admin } from "@/type/common";
import {
  storeAuthenticatedUser,
  updateAdminProfile,
  UserType,
} from "@/lib/redux/features/auth/authSlice";

const ProfileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password must be at least 1 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm new password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm new password must match",
    path: ["confirmNewPassword"],
  });

type AdminProfile = z.infer<typeof ProfileSchema>;
type AdminPassword = z.infer<typeof PasswordSchema>;

const AdminSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const admin = useAppSelector((state) => state.auth.data) as Admin;
  const token = useAppSelector((state) => state.auth.token) as string;

  const dispatch = useAppDispatch();

  console.log(admin);

  const profileForm = useForm<AdminProfile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullName: admin.fullName,
      username: admin.username,
      email: admin.email,
      phone: admin.phone,
    },
  });

  const passwordForm = useForm<AdminPassword>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleProfileSubmit = async (data: AdminProfile) => {
    setIsLoading(true);
    try {
      const res = await requests.patch(`admin/edit-admin/${admin._id}`, data);

      dispatch(updateAdminProfile(data));

      toast.success(res.message);
      // Handle profile update
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: AdminPassword) => {
    setIsLoading(true);
    try {
      const res = await requests.patch(`admin/change-password`, {
        password: data.confirmNewPassword,
        oldPassword: data.currentPassword,
      });

      toast.success(res.message);
      // Handle password change
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
              className="space-y-4 relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                  {/* <DialogLoading /> */}
                </div>
              )}
              <FormField
                control={profileForm.control}
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
                control={profileForm.control}
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
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
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
              <Button type="submit" disabled={isLoading}>
                Save Profile
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-4 relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                  {/* <DialogLoading /> */}
                  loading
                </div>
              )}
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                Change Password
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;
