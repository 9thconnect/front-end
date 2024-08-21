import { Product, ProductsResponse } from "@/type/common";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const getProductList = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  startPrice?: number,
  endPrice?: number
) => {
  const params = new URLSearchParams();

  if (search !== undefined) params.append("search", search);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (filterByProductCategory !== undefined)
    params.append("filterByProductCategory", filterByProductCategory);
  if (startPrice !== undefined)
    params.append("startPrice", startPrice.toString());
  if (endPrice !== undefined) params.append("endPrice", endPrice.toString());

  return requests.get<ProductsResponse>(`/product/shop?${params.toString()}`);
};

export const useGetProductList = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  startPrice?: number,
  endPrice?: number
) => {
  return useQuery({
    queryKey: [
      "productList",
      search,
      pageNumber,
      filterByProductCategory,
      startPrice,
      endPrice,
    ],

    queryFn: () =>
      getProductList(
        search,
        pageNumber,
        filterByProductCategory,
        startPrice,
        endPrice
      ),
  });
};

export const useGetNewArrival = () => {
  return useQuery({
    queryKey: ["productNewArrival"],

    queryFn: () => requests.get<ProductsResponse>(`/product/new-arrival`),
  });
};
