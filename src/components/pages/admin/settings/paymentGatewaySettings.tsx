"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import requests from "@/utils/requests";
import { Skeleton } from "@/components/ui/skeleton";

interface Gateway {
  _id: string;
  gateway: string;
  status: "active" | "inactive";
  locked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GatewayResponse {
  status: string;
  data: Gateway[];
}

interface SwitchGatewayResponse {
  status: string;
  message: string;
}

const API_BASE_URL = "{{url}}"; // Replace with your actual API base URL

const PaymentGatewaySettings: React.FC = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async (): Promise<void> => {
    try {
      const response = await requests.get<Gateway[]>(`payment/gateways`);

      console.log();

      if (response.data) setGateways(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load payment gateways. Please try again later.");
      setLoading(false);
    }
  };

  const switchGateway = async (gatewayId: string): Promise<void> => {
    try {
      setSwitching(true);
      const response = await requests.patch(
        `payment/switch-gateway/${gatewayId}`,
        {}
      );

      setSuccessMessage(response.message);
      fetchGateways(); // Refresh the list to show updated statuses
    } catch (err) {
      setError("Failed to switch gateway. Please try again.");
    } finally {
      setSwitching(false);
    }
  };

  if (loading)
    return (
      <div>
        <Skeleton className="h-7 w-36 mb-4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Payment Gateway Settings</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert variant="default" className="bg-green-100 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gateways.map((gateway) => (
          <Card key={gateway._id}>
            <CardHeader>
              <CardTitle>{gateway.gateway}</CardTitle>
              <CardDescription>Status: {gateway.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => switchGateway(gateway._id)}
                disabled={
                  gateway.status === "active" || gateway.locked || switching
                }
              >
                {gateway.status === "active" ? "Active" : "Activate"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentGatewaySettings;
