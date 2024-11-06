import { Business, ProfessionsResponseData } from "@/type/professional";
import requests from "@/utils/requests";

export const fetchProfessionals = ({
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
  requests.get<{ data: ProfessionsResponseData }>(
    `/vendor/all-professions?search=${encodeURIComponent(
      search
    )}&filterByProfessionType=${professionType}&filterByVendor=${vendor}&pageNumber=${pageNumber}`
  );

export const fetchProfessionalBusinesses = ({
  search = "",
  filterByBusinessType = "",
  filterByVendor = "",
  pageNumber = 1,
}: {
  search?: string;
  filterByBusinessType?: string;
  filterByVendor?: string;
  pageNumber?: number;
}) => {
  const queryParams: Record<string, string | number | boolean | undefined> = {
    search,
    pageNumber,
    filterByBusinessType,
    filterByVendor,
  };

  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
    .join("&");

  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      businesses: Business[];
    };
  }>(`/vendor/all-businesses${queryString ? `?${queryString}` : ""}`);
};
