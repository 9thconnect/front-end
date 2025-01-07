import {
  Business,
  BusinessResponseData,
  ProfessionsResponseData,
} from "@/type/professional";
import requests from "@/utils/requests";

export const fetchBusinesses = ({
  search = "",
  professionType = "",
  vendor = "",
  pageNumber = 1,
}: {
  search?: string;
  professionType?: string;
  vendor?: string;
  pageNumber?: number;
}) =>
  requests.get<{ data: BusinessResponseData }>(
    `/vendor/all-businesses?search=${encodeURIComponent(
      search
    )}&filterByProfessionType=${professionType}&filterByVendor=${vendor}&pageNumber=${pageNumber}`
  );

export const fetchBusinessById = (id: string) =>
  requests.get<Business>(`business/${id}`);

export const approveBusiness = (id: string) =>
  requests.patch(`/vendor/approve-business-profession/${id}/business`, {});
