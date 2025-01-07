import { LogisticsResponse } from "@/type/logistics";
import { PropertyResponse } from "../../../type/common";
import { ProductsResponse } from "@/type/common";
import { Property } from "@/type/property";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const useGetLogisticsList = (
  search?: string,
  pageNumber?: number,
  filteredByLogisticType?: string,
  searchByLogisticSubType?: string,
  searchByMarketedBy?: string
) => {
  return useQuery({
    queryKey: [
      "logisticsList",
      search,
      pageNumber,
      filteredByLogisticType,
      searchByLogisticSubType,
      searchByMarketedBy,
    ],
    queryFn: () =>
      getLogisticsList(
        search,
        pageNumber,
        filteredByLogisticType,
        searchByLogisticSubType,
        searchByMarketedBy
      ),
  });
};

// API request function
export const getLogisticsList = async (
  search?: string,
  pageNumber?: number,
  filteredByLogisticType?: string,
  searchByLogisticSubType?: string,
  searchByMarketedBy?: string
) => {
  const params = new URLSearchParams({
    ...(search && { search }),
    ...(pageNumber && { pageNumber: pageNumber.toString() }),
    ...(filteredByLogisticType && { filteredByLogisticType }),
    ...(searchByLogisticSubType && { searchByLogisticSubType }),
    ...(searchByMarketedBy && { searchByMarketedBy }),
  });

  return requests.get<LogisticsResponse>(
    `logistic/fleets?${params.toString()}`
  );
};
