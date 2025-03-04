"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import requests from "@/utils/requests";
import { PropertyData } from "@/components/tables/admin/properties/columns";
import TwoStageAlertDialog from "@/components/alerts/twoStageAlertDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PropertySinglePage = () => {
  const params = useParams();
  const propertyId = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["single-property", propertyId],
    queryFn: () =>
      requests.get<{ data: PropertyData }>(
        `/real-estate/vendor/property-single/${propertyId}`
      ),
  });

  const propertyData = data?.data?.data;

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
        Error loading property details
      </div>
    );
  }

  if (!propertyData) {
    return <div className="text-center py-10">Property not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-wrap sm:flex-nowrap space-x-3 mt-3 sm:mt-0  ">
          {(propertyData.propertyPending || propertyData?.propertyApproved) && (
            <TwoStageAlertDialog
              triggerButton={<Button variant={"outline"}>Reject</Button>}
              triggerText="Reject"
              initialTitle="Reject Property"
              nextTitle="Reason for rejection"
              initialDescription="Rejecting this Property will not let it be displayed for users"
              apiUrl={`vendor/approve-business-profession/${propertyData._id}/property/reject`}
              type="reject"
            />
          )}

          {(propertyData.propertyPending || propertyData?.propertyRejected) && (
            <TwoStageAlertDialog
              triggerButton={<Button variant={"outline"}>Approve</Button>}
              triggerText="Approve"
              initialTitle="Approve Property"
              nextTitle="You are about to Approve a Property"
              initialDescription="Approving this property will make it appear to users"
              apiUrl={`vendor/approve-business-profession/${propertyData._id}/property/approve`}
              type="approve"
            />
          )}
        </div>
        <Link href={`/dashboard/realtors/${propertyData.vendor._id}`}>
          <Button>View {propertyData.vendor.fullName}</Button>
        </Link>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {propertyData.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${propertyData.title} - Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Property Title and Price */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1>
        <p className="text-2xl text-green-600 font-semibold">
          ₦{propertyData.price.toLocaleString()}
        </p>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <p>{propertyData.description}</p>
          <div className="mt-4">
            <p>
              Location: {propertyData.location.address},{" "}
              {propertyData.location.state}, {propertyData.location.country}
            </p>
            <p>Type: {propertyData.propertyType.title}</p>
            <p>Bedrooms: {propertyData.details.bedroom}</p>
            <p>Bathrooms: {propertyData.details.bathroom}</p>
            <p>Toilets: {propertyData.details.toilet}</p>
            <p>Sitting Rooms: {propertyData.details.sittingRoom}</p>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <ul className="list-disc pl-5">
            {propertyData.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Contact Vendor</h2>
        <p>Vendor: {propertyData.vendor.fullName}</p>
        <p>Call: {propertyData.contact.callNumber}</p>
        <p>WhatsApp: {propertyData.contact.whatsAppNumber}</p>
        <p>Marketed by: {propertyData.marketedBy.shopName}</p>
        <div className="mt-4">
          <img
            src={propertyData.marketedBy.businessLogo}
            alt="Business Logo"
            className="h-16 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertySinglePage;
