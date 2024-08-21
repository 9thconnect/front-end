import { BaseResponse } from "./common";

export interface Category {
  _id: string;
  business?: string;
  product?: string;
  profession?: string;
  title?: string;
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

export type CategoryType = "business" | "profession" | "product";
