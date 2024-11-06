import { Payment, SingleTransactionData } from "@/type/common";
import requests from "@/utils/requests";

export const getPaymentsAdmin = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  filteredByStatus?: string,
  filteredByCompletedPayment?: boolean,
  startDate?: string,
  endDate?: string,
  paymentFor?: "order" | "service" | "withdrawal" | "payout",
  filteredByVendor?: string
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
    paymentFor,
    filteredByVendor,
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
  }>(`/payment/admin/payments${queryString ? `?${queryString}` : ""}`);
};

export const getSinglePaymentAdmin = (id?: string) => {
  return requests.get<SingleTransactionData>(`/payment/admin/${id}`);
};
