import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export interface ProfessionalsResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    professions: Array<{
      _id: string;
      vendor: {
        _id: string;
        fullName: string;
        vendorID: string;
        email: string;
        avatar: string;
      };
      professionType: string | null;
      profession: string;
      professionName: string;
      professionDesc: string;
      professionCity: string;
      professionID: string;
      professionApproved: boolean;
      professionActive: boolean;
      price: number;
      portfolio: string[];
      qualifications: Array<{
        degree: string;
        institute: string;
        year: string;
        _id: string;
      }>;
      createdAt: string;
      updatedAt: string;
      __v: number;
      ownerType: string;
    }>;
  };
}

export const getProfessionalList = (
  type: "professional" | "artisan",
  search?: string,
  pageNumber?: number,
  filterByProfessionType?: string,
  filterByProfession?: string,
  startPrice?: number,
  endPrice?: number
) => {
  console.log(filterByProfessionType, "jj");

  const params = new URLSearchParams();

  if (search !== undefined) params.append("search", search);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (filterByProfessionType !== undefined)
    params.append("filterByProfessionType", filterByProfessionType);
  if (filterByProfession)
    params.append("filterByProfession", filterByProfession);
  if (startPrice !== undefined)
    params.append("startPrice", startPrice.toString());
  if (endPrice !== undefined) params.append("endPrice", endPrice.toString());

  if (type && type == "artisan") {
    return requests.get<ProfessionalsResponse>(
      `/pro/all-artisan-gig?${params.toString()}`
    );
  }
  return requests.get<ProfessionalsResponse>(
    `/pro/all-pro-gig?${params.toString()}`
  );
};

export const useGetProfessionalList = (
  type: "professional" | "artisan",
  search?: string,
  pageNumber?: number,
  filterByProfessionType?: string,
  filterByProfession?: string,
  startPrice?: number,
  endPrice?: number
) => {
  return useQuery({
    queryKey: [
      "professionalList",
      search,
      pageNumber,
      filterByProfessionType,
      filterByProfession,
      startPrice,
      endPrice,
    ],
    queryFn: () =>
      getProfessionalList(
        type,
        search,
        pageNumber,
        filterByProfessionType,
        filterByProfession,
        startPrice,
        endPrice
      ),
  });
};