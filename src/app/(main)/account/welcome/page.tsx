"use client";

import React from "react";
import {
  Check,
  ShoppingBag,
  Settings,
  Store,
  ArrowRight,
  Bell,
  Upload,
  Plus,
  Building,
  Briefcase,
  Package,
  Home,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";
import { useRouter } from "next/navigation";

const Page = () => {
  const vendor = useAppSelector((state) => state.auth.data as IVendor);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Our Marketplace! {vendor?.fullName}!
          </h1>
          <p className="text-gray-600 mb-8">
            Get started by setting up your {vendor?.vendorType} account
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">Complete Your Store</h3>
              <p className="text-gray-500 text-sm">
                Add your store details, banner, and customize your shop page.
              </p>
              <Button className="w-full" variant="outline">
                Customize Store
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">Add Products</h3>
              <p className="text-gray-500 text-sm">
                Start adding your products or services to your store.
              </p>
              <Button className="w-full" variant="outline">
                Add Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg">Account Settings</h3>
              <p className="text-gray-500 text-sm">
                Configure your payment methods and notification preferences.
              </p>
              <Button className="w-full" variant="outline">
                Go to Settings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Alert className="bg-blue-50 border-blue-200">
          <Bell className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-blue-800">View Documentation</AlertTitle>
          <AlertDescription className="text-blue-700">
            Check out our comprehensive seller guide and documentation to learn
            more about setting up your store, managing orders, and growing your
            business on our platform.
          </AlertDescription>
        </Alert>

        {/* Quick Start Button */}
        <div className="text-center pt-4">
          <Button
            onClick={() => router.push("/account/profile")}
            size="lg"
            className="px-8"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
