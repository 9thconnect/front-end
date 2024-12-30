import { Property } from "@/type/property";
import requests from "@/utils/requests";

export const getProperties = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  searchByLocation?: string
) => {
  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      properties: Property[];
    };
  }>(
    `real-estate/vendor/my-properties?search=${search || ""}&pageNumber=${
      pageNumber || ""
    }&filteredByPropertyType=${
      filterByProductCategory || ""
    }&searchByLocation=${searchByLocation || ""}`
  );
};

export const deleteProperty = (id: string) => {
  return requests.delete<null>(`real-estate/vendor/delete-property/${id}`);
};
