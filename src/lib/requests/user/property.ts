import { PropertyResponse } from "./../../../type/common";
import { ProductsResponse } from "@/type/common";
import { Property } from "@/type/property";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const useGetSimilarProperties = (id: string) => {
  return useQuery({
    queryKey: ["get-similar", id],

    queryFn: () =>
      requests.get<{
        data: {
          page: number;
          pages: number;
          count: number;
          properties: Property[];
        };
      }>(`/real-estate/properties/related/${id}`),
  });
};

export const getPropertyList = async (
  search?: string,
  pageNumber?: number,
  filteredByPropertyType?: string,
  searchByLocation?: string,
  startPrice?: number,
  endPrice?: number
) => {
  const params = new URLSearchParams({
    ...(search && { search }),
    ...(pageNumber && { pageNumber: pageNumber.toString() }),
    ...(filteredByPropertyType && { filteredByPropertyType }),
    ...(searchByLocation && { searchByLocation }),
    ...(startPrice && { startPrice: startPrice.toString() }),
    ...(endPrice && { endPrice: endPrice.toString() }),
  });

  return requests.get<PropertyResponse>(
    `real-estate/properties?${params.toString()}`
  );
};

export const useGetPropertyList = (
  search?: string,
  pageNumber?: number,
  filteredByPropertyType?: string,
  searchByLocation?: string,
  startPrice?: number,
  endPrice?: number
) => {
  return useQuery({
    queryKey: [
      "propertyList",
      search,
      pageNumber,
      filteredByPropertyType,
      searchByLocation,
      startPrice,
      endPrice,
    ],
    queryFn: () =>
      getPropertyList(
        search,
        pageNumber,
        filteredByPropertyType,
        searchByLocation,
        startPrice,
        endPrice
      ),
  });
};
