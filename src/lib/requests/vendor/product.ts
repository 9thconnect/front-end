import { ProductsResponse } from "@/type/common";
import requests from "@/utils/requests";

export const getProducts = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string
) => {
  return requests.get<ProductsResponse>(
    `/product/vendor/my-products?search=${search || ""}&pageNumber=${
      pageNumber || ""
    }&filterByProductCategory=${filterByProductCategory || ""}`
  );
};

export const deleteProduct = (id: string) => {
  return requests.delete<null>(`product/vendor/edit/delete-product/${id}`);
};
