"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import requests from "@/utils/requests";
import { LogisticsData } from "@/components/tables/fleet/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TwoStageAlertDialog from "@/components/alerts/twoStageAlertDialog";

const FleetSinglePage = () => {
  const params = useParams();
  const logisticId = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["single-logistic", logisticId],
    queryFn: () =>
      requests.get<{ data: LogisticsData }>(
        `/logistic/logistic-single/${logisticId}`
      ),
  });

  const logisticData = data?.data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading logistic details
      </div>
    );
  }

  if (!logisticData) {
    return <div className="text-center py-10">Logistic not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-wrap sm:flex-nowrap space-x-3 mt-3 sm:mt-0">
          {/* Placeholder for potential action buttons */}
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
        <Link href={`/dashboard/vendors/${logisticData.vendor._id}`}>
          <Button>View {logisticData.vendor.fullName}</Button>
        </Link>
      </div>

      {/* Logistic Image */}
      {logisticData.image && (
        <div className="mb-8">
          <img
            src={logisticData.image}
            alt={logisticData.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Logistic Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{logisticData.title}</h1>
        <p className="text-xl text-green-600 font-semibold">
          Rate: ₦{logisticData.ratePerKg.toLocaleString()} per kg
        </p>
      </div>

      {/* Logistic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Logistic Details</h2>
          <p>{logisticData.details}</p>
          <div className="mt-4 space-y-2">
            <p>Registration: {logisticData.registration}</p>
            <p>Type: {logisticData.logisticType}</p>
            <p>Sub Type: {logisticData.logisticSubType}</p>
            <p>Capacity: {logisticData.capacity} kg</p>
            <p>Fuel Type: {logisticData.fuelType}</p>
            <p>
              Rate per Kilometer: ₦
              {logisticData.ratePerKilometer.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-gray-100 p-6 rounded-lg space-y-2">
            <p>Vendor: {logisticData.vendor.fullName}</p>
            <p>Call: {logisticData.contact.callNumber}</p>
            <p>WhatsApp: {logisticData.contact.whatsAppNumber}</p>
            <h3 className="text-lg font-semibold mt-4">Marketed By</h3>
            <p>Shop: {logisticData.marketedBy.shopName}</p>
            <p>City: {logisticData.marketedBy.shopCity}</p>
            {logisticData.marketedBy.businessLogo && (
              <img
                src={logisticData.marketedBy.businessLogo}
                alt="Business Logo"
                className="h-16 w-auto mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Additional Metadata */}
      <div className="text-sm text-gray-500 mt-4">
        <p>Created: {new Date(logisticData.createdAt).toLocaleDateString()}</p>
        <p>
          Last Updated: {new Date(logisticData.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FleetSinglePage;
