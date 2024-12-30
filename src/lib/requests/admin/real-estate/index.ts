import { Business, ProfessionsResponseData } from "@/type/professional";
import requests from "@/utils/requests";

export const fetchRealtorBusinesses = ({
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
  }>(
    `/vendor/all-businesses?filterByVendorType=real-estate${
      queryString ? `&${queryString}` : ""
    }`
  );
};
