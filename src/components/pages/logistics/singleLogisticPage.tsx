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
import {
  Truck,
  MapPin,
  Phone,
  MessageCircle,
  Fuel,
  Package2,
  Timer,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import requests from "@/utils/requests";
import { toast } from "sonner";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { formatCurrency } from "@/utils/format-currency";
import { Logistics } from "@/type/logistics";

interface LogisticsDetailsProps {
  label: string;
  value: string | number;
}

const LogisticsDetails: React.FC<LogisticsDetailsProps> = ({
  label,
  value,
}) => (
  <div className="flex items-center mb-4">
    <p className="mr-7 text-gray-600">{label}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

const SingleLogisticsPage = ({ id }: { id: string }) => {
  const [logistics, setLogistics] = useState<Logistics>();
  const [loading, setLoading] = useState(false);
  const [similarLogistics, setSimilarLogistics] = useState<Logistics[]>([]);

  useEffect(() => {
    const getLogistics = async () => {
      setLoading(true);
      try {
        const { data } = await requests.get<{ data: Logistics }>(
          `logistic/logistic-single/${id}`
        );
        setLogistics(data?.data);
      } catch (error) {
        toast.error("Error getting logistics details");
      } finally {
        setLoading(false);
      }
    };

    getLogistics();
  }, [id]);

  const handleCall = () => {
    if (logistics?.contact.callNumber) {
      window.location.href = `tel:${logistics.contact.callNumber}`;
    }
  };

  const handleWhatsApp = () => {
    if (logistics) {
      const message = `Hi, I'm interested in your logistics service: ${logistics.title}`;
      window.open(
        `https://wa.me/${
          logistics.contact.whatsAppNumber
        }?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/logistics">Logistics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {logistics?.title ?? ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SectionContainer className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src={logistics?.image}
              alt={logistics?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {logistics && (
            <div className="px-8 flex flex-col">
              <h2 className="font-bold text-gray-950 text-2xl my-3">
                {logistics.title}
              </h2>

              <div className="flex space-x-4 flex-wrap text-gray-950">
                <div className="flex items-center">
                  <Truck size={20} className="text-primary" />
                  <span className="ml-2 capitalize">
                    {logistics.logisticType}
                  </span>
                </div>
                <div className="flex">
                  <MapPin size={20} className="text-primary" />
                  <span className="ml-2">{logistics.marketedBy.shopCity}</span>
                </div>
              </div>

              <div className="mt-7 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rate per KG:</span>
                  <span className="text-2xl font-semibold text-primary">
                    {formatCurrency(logistics.ratePerKg)}/kg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rate per KM:</span>
                  <span className="text-2xl font-semibold text-primary">
                    {formatCurrency(logistics.ratePerKilometer)}/km
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center">
                  <Package2 size={20} className="text-primary" />
                  <p className="ml-2">
                    {logistics.capacity.toLocaleString()}kg Capacity
                  </p>
                </div>
                <div className="flex items-center">
                  <Fuel size={20} className="text-primary" />
                  <p className="ml-2">{logistics.fuelType}</p>
                </div>
              </div>

              <div className="w-full flex mt-8 space-x-4">
                <Button
                  onClick={handleCall}
                  className="flex-1"
                  variant="default"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button
                  onClick={handleWhatsApp}
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
              <TabsTrigger value="details">Vehicle Details</TabsTrigger>
              <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full border-t" value="details">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                <p className="mb-4">{logistics?.details}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3">Vehicle Features</h3>
                    <LogisticsDetails
                      label="Vehicle Type"
                      value={logistics?.logisticSubType || ""}
                    />
                    <LogisticsDetails
                      label="Registration"
                      value={logistics?.registration || ""}
                    />
                    <LogisticsDetails
                      label="Capacity"
                      value={`${logistics?.capacity.toLocaleString() || 0}kg`}
                    />
                    <LogisticsDetails
                      label="Fuel Type"
                      value={logistics?.fuelType || ""}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Rates</h3>
                    <LogisticsDetails
                      label="Per Kilogram"
                      value={formatCurrency(logistics?.ratePerKg || 0) + "/kg"}
                    />
                    <LogisticsDetails
                      label="Per Kilometer"
                      value={
                        formatCurrency(logistics?.ratePerKilometer || 0) + "/km"
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="vendor">
              <div className="mt-3 p-7">
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
                  <Separator className="my-4" />
                  <LogisticsDetails
                    label="Company"
                    value={logistics?.marketedBy.shopName || ""}
                  />
                  <LogisticsDetails
                    label="Business Name"
                    value={logistics?.marketedBy.businessLegalName || ""}
                  />
                  <LogisticsDetails
                    label="Location"
                    value={logistics?.marketedBy.shopCity || ""}
                  />
                  <LogisticsDetails
                    label="Vendor ID"
                    value={logistics?.marketedBy.shopID || ""}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionContainer>
    </div>
  );
};

export default SingleLogisticsPage;
