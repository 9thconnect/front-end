import { FetchCategoryResponse } from "@/type/category";
import requests from "@/utils/requests";

export const fetchProductCategories = () =>
  requests.get<FetchCategoryResponse>(
    "/category/all?search&pageNumber=1&filterCategoryType=product-category"
  );

export const fetchProfessionalsCategories = () =>
  requests.get<FetchCategoryResponse>(
    "/category/all?search&pageNumber=1&filterCategoryType=profession-category"
  );

export const fetchBusinessCategories = () =>
  requests.get<FetchCategoryResponse>(
    "/category/all?search&pageNumber=1&filterCategoryType=business-category"
  );

export const fetchBrandCategories = () =>
  requests.get<FetchCategoryResponse>(
    "/category/all?search&pageNumber=1&filterCategoryType=brand"
  );

export const fetchSubCategories = ({ queryKey }: { queryKey: any }) => {
  const [_key, { category, page }] = queryKey;
  return requests.get<FetchCategoryResponse>(
    `/category/all?search&pageNumber=${page}&filterProductCategory=${category}`
  );
};
