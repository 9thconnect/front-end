import { ProductsResponse } from "@/type/common";
import requests from "@/utils/requests";

interface ProductQueryParams {
  search?: string;
  pageNumber?: number;
  filterByProductCategory?: string;
  filterByProductBySeller?: string;
}

export const getProductsAdmin = ({
  search,
  pageNumber,
  filterByProductCategory,
  filterByProductBySeller,
}: ProductQueryParams = {}) => {
  const queryParams = new URLSearchParams();

  if (search !== undefined) queryParams.append("search", search.toString());
  if (pageNumber !== undefined)
    queryParams.append("pageNumber", pageNumber.toString());
  if (filterByProductCategory !== undefined)
    queryParams.append(
      "filterByProductCategory",
      filterByProductCategory.toString()
    );
  if (filterByProductBySeller !== undefined)
    queryParams.append(
      "filterByProductBySeller",
      filterByProductBySeller.toString()
    );

  const queryString = queryParams.toString();
  const url = `/product/admin/all-products${
    queryString ? `?${queryString}` : ""
  }`;

  return requests.get<ProductsResponse>(url);
};
