import { BaseResponse } from "./common";

export interface Category {
  _id: string;
  categoryType: CategoryType;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponseData {
  page: number;
  pages: number;
  count: number;
  categories: Category[];
}

export interface FetchCategoryResponse
  extends BaseResponse<CategoryResponseData> {}

export type CategoryType =
  | "business-category"
  | "profession-category"
  | "product-category"
  | "brand"
  | "product-sub-category";
