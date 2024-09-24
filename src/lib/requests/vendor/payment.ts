import { Payment } from "@/type/common";
import requests from "@/utils/requests";

export const getPayments = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  filteredByStatus?: string,
  filteredByCompletedPayment?: boolean,
  startDate?: string,
  endDate?: string
) => {
  // Create a query object based on the passed parameters
  const queryParams: Record<string, string | number | boolean | undefined> = {
    search,
    pageNumber,
    filteredByStatus,
    filteredByCompletedPayment,
    startDate,
    endDate,
    filterByProductCategory,
  };

  // Filter out undefined values from the query object
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
    .join("&");

  // Make the request with the dynamically constructed query string
  return requests.get<{
    page: number;
    pages: number;
    count: number;
    payments: Array<Payment>;
  }>(`/payment/vendor/payments${queryString ? `?${queryString}` : ""}`);
};
