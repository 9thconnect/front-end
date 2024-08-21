import { FetchCategoryResponse } from "@/type/category";
import requests from "@/utils/requests";

export const fetchProductCategories = () =>
  requests.get<FetchCategoryResponse>("/category/product/all");

export const fetchProfessionalsCategories = () =>
  requests.get<FetchCategoryResponse>("/category/profession/all");

export const fetchBusinessCategories = () =>
  requests.get<FetchCategoryResponse>("/category/business/all");
