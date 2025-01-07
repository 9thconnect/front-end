import { Logistics } from "@/type/logistics";
import requests from "@/utils/requests";

export interface FleetResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    logistics: Logistics[];
  };
}

export const getFleets = (
  search?: string,
  pageNumber?: number,
  filteredByLogisticType?: string,
  searchByLogisticSubType?: string
) => {
  return requests.get<FleetResponse>(
    `logistic/vendor/my-fleets?${new URLSearchParams({
      search: search || "",
      pageNumber: pageNumber?.toString() || "1",
      filteredByLogisticType: filteredByLogisticType || "",
      searchByLogisticSubType: searchByLogisticSubType || "",
    }).toString()}`
  );
};

export const deleteFleet = (logisticId: string) => {
  return requests.delete<{ message: string }>(
    `logistic/vendor/delete-fleet/${logisticId}`
  );
};
