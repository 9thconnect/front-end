import { VendorResponse } from "@/type/common";
import {
  Business,
  BusinessResponseData,
  ProfessionsResponseData,
} from "@/type/professional";
import { IVendor } from "@/type/users";
import requests from "@/utils/requests";

export const fetchVendor = ({
  search = "",
  vendorType,
  pageNumber = 1,
}: {
  search?: string;
  vendorType?: "seller" | "professional" | "real-estate" | "logistic";
  vendor?: string;
  pageNumber?: number;
}) =>
  requests.get<VendorResponse>(
    `/vendor/all-vendors?search=${encodeURIComponent(
      search
    )}&filterByVendorType=${vendorType}&pageNumber=${pageNumber}`
  );

export const fetchVendorById = (id: string) =>
  requests.get<IVendor>(`vendor/vendor/${id}`);

export const approveBusiness = (id: string) =>
  requests.patch(`/vendor/approve-business-profession/${id}/business`, {});
