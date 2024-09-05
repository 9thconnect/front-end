import { Category } from "./category";

export interface BaseResponse<T> {
  message: string;
  status: "success" | "error";
  data: T | null;
}

interface Seller {
  _id: string;
  fullName: string;
  vendorID: string;
  avatar: string;
}

export interface Product {
  discount: {
    active: boolean;
    amount: number;
  };
  _id: string;
  name: string;
  description: string;
  price: number;
  seller: Seller;
  productCategory: Category;
  subCategory: Category;
  images: string[];
  available: boolean;
  views: number;
  viewers: any[]; // You might want to define a more specific type for viewers
  disabled: boolean;
  dateAdded: string;
  numSold: number;
  createdAt: string;
  updatedAt: string;
  stockQuantity: number;
  variations: any[];
  rating: number;
  numReviews: number;
  __v: number;
}

export interface ProductsResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    products: Product[];
  };
}

export interface SimilarProductResponse {
  data: Product[];
}

export interface CartItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  date: string;
  productId: Product;
  seller: string;
  _id: string;
  total: number;
}
