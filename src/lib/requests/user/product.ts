import {
  CartItem,
  Order,
  OrderResponse,
  Product,
  ProductsResponse,
  SimilarProductResponse,
} from "@/type/common";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const getProductList = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  filterBySubCategory?: string,
  startPrice?: number,
  endPrice?: number,
  filterByBrands?: string
) => {
  const params = new URLSearchParams();

  if (search !== undefined) params.append("search", search);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (filterByProductCategory !== undefined)
    params.append("filterByProductCategory", filterByProductCategory);
  if (filterBySubCategory)
    params.append("filterBysubCategory", filterBySubCategory);
  if (startPrice !== undefined)
    params.append("startPrice", startPrice.toString());
  if (endPrice !== undefined) params.append("endPrice", endPrice.toString());
  if (filterByBrands !== undefined)
    params.append("filterByBrands", filterByBrands.toString());

  return requests.get<ProductsResponse>(`/product/shop?${params.toString()}`);
};

export const useGetProductList = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  filterBySubCategory?: string,
  startPrice?: number,
  endPrice?: number,
  filterByBrands?: string
) => {
  console.log(filterByBrands);

  return useQuery({
    queryKey: [
      "productList",
      search,
      pageNumber,
      filterByProductCategory,
      filterBySubCategory,
      startPrice,
      endPrice,
      filterByBrands,
    ],

    queryFn: () =>
      getProductList(
        search,
        pageNumber,
        filterByProductCategory,
        filterBySubCategory,
        startPrice,
        endPrice,
        filterByBrands
      ),
  });
};

export const useGetNewArrival = () => {
  return useQuery({
    queryKey: ["productNewArrival"],

    queryFn: () => requests.get<ProductsResponse>(`/product/new-arrival`),
  });
};

export const useGetTopRated = () => {
  return useQuery({
    queryKey: ["productTopRated"],

    queryFn: () => requests.get<ProductsResponse>(`/product/top-rated`),
  });
};

export const useGetFeaturedProducts = (type: "new-arrival" | "top-rated") => {
  return useQuery({
    queryKey: [type],

    queryFn: () => requests.get<ProductsResponse>(`/product/${type}`),
  });
};

export const useGetSimilarProducts = (id: string) => {
  return useQuery({
    queryKey: ["get-similar", id],

    queryFn: () =>
      requests.get<SimilarProductResponse>(
        `/product/customer/related-products/${id}`
      ),
  });
};

export const addToCart = (id: string, qty: number) => {
  return requests.patch<CartItem>(`/customer/add-to-cart/${id}/${qty}`, {});
};

export const addToWishList = (id: string) => {
  return requests.patch<CartItem>(`/customer/wishlist-product/${id}`, {});
};

export const removeFromCart = (id: string) => {
  return requests.patch<CartItem>(`/customer/remove-prod/${id}`, {});
};

export const clearCartFromServer = () => {
  return requests.patch<{ cart: [] }>(`/customer/clear-cart`, {});
};

export const useGetMyCert = (id: string) => {
  return useQuery({
    queryKey: ["get-cart", id],

    queryFn: () => requests.get<CartItem[]>(`/customer/myCart?userID=${id}`),
  });
};

interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Body {
  deliveryMethod: string;
  deliveryPrice: number;
  shippingAddress: ShippingAddress;
}

export const orderProduct = (body: Body) => {
  return requests.post<{ checkout: string }>(
    `/order/customer/create-order`,
    body
  );
};

export const getWishlist = () => {
  return requests.get<{
    count: number;
    wishlist: Array<{
      _id: string;
      name: string;
      price: number;
      images: Array<string>;
    }>;
  }>(`/customer/my-wishlist`);
};
export const getOrders = ({ queryKey }: { queryKey: any }) => {
  const [_key, { page, userType, vendor }] = queryKey;

  console.log(vendor);

  if (vendor) {
    return requests.get<OrderResponse>(
      `/order/${userType}/orders?pageNumber=${page}&filterByVendor=${vendor}`
    );
  } else {
    return requests.get<OrderResponse>(
      `/order/${userType}/orders?pageNumber=${page}`
    );
  }
};

export const getOrder = ({ queryKey }: { queryKey: any }) => {
  const [_key, { id, userType, vendor }] = queryKey;
  return requests.get<Order>(`order/${userType}/order/${id}`);
};
