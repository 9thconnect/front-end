"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SectionContainer from "@/components/cards/common/sectionContainer";
import CustomGallery from "@/components/gallery/customGallery";
import { Building2, MapPin, Phone, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import requests from "@/utils/requests";
import { toast } from "sonner";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { formatCurrency } from "@/utils/format-currency";
import { Property } from "@/type/property";
import PropertyCard from "@/components/cards/propertyCard";
import { useGetSimilarProperties } from "@/lib/requests/user/property";

interface PropertyDetailsProps {
  label: string;
  value: string | number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ label, value }) => (
  <div className="flex items-center mb-4">
    <p className="mr-7 text-gray-600">{label}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

const SinglePropertyPage = ({ id }: { id: string }) => {
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(false);

  const {
    data: similarPropertyList,
    isLoading,
    isError,
    error,
  } = useGetSimilarProperties(id);

  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      try {
        const { data } = await requests.get<{ data: Property }>(
          `real-estate/vendor/property-single/${id}`
        );
        setProperty(data?.data);
      } catch (error) {
        toast.error("Error getting property details");
      } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);

  const handleCallVendor = () => {
    window.location.href = `tel:+2342014642998`;
  };

  const handleWhatsAppVendor = () => {
    console.log("kjdfvgiuwer");

    if (property) {
      const message = `Hi, I'm interested in your property: ${property.title}`;
      window.open(
        `https://wa.me/${"+2342014642998"}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const images = property?.images.map((url) => ({
    original: url,
    thumbnail: url,
    alt: property.title,
  }));

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {property?.title ?? ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SectionContainer className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images && <CustomGallery images={images} />}

          {property && (
            <div className="px-8 flex flex-col">
              <h2 className="font-bold text-gray-950 text-2xl my-3">
                {property.title}
              </h2>

              <div className="flex space-x-4 flex-wrap text-gray-950">
                <div className="flex items-center">
                  <Building2 size={20} className="text-primary" />
                  <span className="ml-2">{property.propertyType.title}</span>
                </div>
                <div className="flex">
                  <MapPin size={20} className="text-primary" />
                  <span className="ml-2">
                    {property.location.address}, {property.location.state}
                  </span>
                </div>
              </div>

              <h3 className="text-gray-950 text-4xl mt-7">
                {formatCurrency(property.price)}
              </h3>

              <div className="flex items-center mt-4">
                <div className="flex items-center mr-6">
                  <Building2 size={20} className="text-primary" />
                  <p className="ml-2">{property.details.bedroom} Bedrooms</p>
                </div>
                <div className="flex items-center">
                  <Building2 size={20} className="text-primary" />
                  <p className="ml-2">{property.details.bathroom} Bathrooms</p>
                </div>
              </div>

              <div className="my-6">
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full flex mt-5 space-x-4">
                <Button
                  onClick={handleCallVendor}
                  className="flex-1"
                  variant="default"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Vendor
                </Button>
                <Button
                  onClick={handleWhatsAppVendor}
                  className="flex-1"
                  variant="outline"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      <SectionContainer className="mt-5">
        <div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full sm:w-auto pb-3 bg-white">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="agent">Agent Info</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full border-t" value="details">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                <p className="mb-4">{property?.description}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3">Property Features</h3>
                    <PropertyDetails
                      label="Bedrooms"
                      value={property?.details.bedroom || 0}
                    />
                    <PropertyDetails
                      label="Bathrooms"
                      value={property?.details.bathroom || 0}
                    />
                    <PropertyDetails
                      label="Toilets"
                      value={property?.details.toilet || 0}
                    />
                    <PropertyDetails
                      label="Living Rooms"
                      value={property?.details.sittingRoom || 0}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Location</h3>
                    <PropertyDetails
                      label="Address"
                      value={property?.location.address || ""}
                    />
                    <PropertyDetails
                      label="State"
                      value={property?.location.state || ""}
                    />
                    <PropertyDetails
                      label="Country"
                      value={property?.location.country || ""}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="agent">
              <div className="mt-3 p-7">
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Agent Details</h2>
                  <Separator className="my-4" />
                  <PropertyDetails
                    label="Company"
                    value={property?.marketedBy.shopName || ""}
                  />
                  <PropertyDetails
                    label="Business Name"
                    value={property?.marketedBy.businessLegalName || ""}
                  />
                  <PropertyDetails
                    label="Location"
                    value={property?.marketedBy.shopCity || ""}
                  />
                  <PropertyDetails
                    label="Agent ID"
                    value={property?.marketedBy.shopID || ""}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionContainer>

      {!isLoading &&
        similarPropertyList &&
        similarPropertyList.data &&
        similarPropertyList.data?.data?.count > 0 && (
          <SectionContainer>
            <SectionCardHeader
              title="Similar Properties"
              linkUrl="/properties"
              linkText="See more"
            />
            <ScrollableContainer>
              <div className="flex space-x-4 cursor-pointer mt-5">
                {similarPropertyList.data?.data.properties.map(
                  (property, index) => (
                    <div className="w-80 flex-none self-stretch" key={index}>
                      <PropertyCard property={property} />
                    </div>
                  )
                )}
              </div>
            </ScrollableContainer>
          </SectionContainer>
        )}
    </div>
  );
};

export default SinglePropertyPage;
