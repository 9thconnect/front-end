import { ProductsResponse } from "@/type/common";
import requests from "@/utils/requests";

export const getProductsAdmin = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string
) => {
  return requests.get<ProductsResponse>(
    `/product/admin/all-products?search=${search || ""}&pageNumber=${
      pageNumber || ""
    }&filterByProductCategory=${filterByProductCategory || ""}`
  );
};
