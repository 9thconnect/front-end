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
