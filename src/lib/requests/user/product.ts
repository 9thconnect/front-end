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
  filterByBrands?: string,
  channel?: "wholeSale" | "retail"
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

  if (channel && channel == "wholeSale") {
    return requests.get<ProductsResponse>(
      `/product/b2b-shop?${params.toString()}`
    );
  }
  return requests.get<ProductsResponse>(`/product/shop?${params.toString()}`);
};

export const useGetProductList = (
  search?: string,
  pageNumber?: number,
  filterByProductCategory?: string,
  filterBySubCategory?: string,
  startPrice?: number,
  endPrice?: number,
  filterByBrands?: string,
  channel?: "wholeSale" | "retail",
  enabled = true
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
      channel,
    ],
    enabled: enabled,

    queryFn: () =>
      getProductList(
        search,
        pageNumber,
        filterByProductCategory,
        filterBySubCategory,
        startPrice,
        endPrice,
        filterByBrands,
        channel
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

export const useGetFeaturedProducts = (
  type: "new-arrival" | "top-rated" | "b2b-top-rated" | "b2b-new-arrival"
) => {
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
  console.log("addToCart", qty);

  return requests.patch<CartItem>(`/customer/add-to-cart/${id}/${qty}`, {});
};

export const decreaseFromCart = (id: string) => {
  console.log("decreaseFromCart");

  return requests.patch<CartItem>(`/customer/decrement-cart/${id}`, {});
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
  redirectURL: string;
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
  const [
    _key,
    { page, userType, vendor, search, status, reportedOrder, fromDate, toDate },
  ] = queryKey;

  console.log(vendor);

  const queryParams: Record<string, string | number | boolean | undefined> = {
    search: search,
    pageNumber: page,
    filteredByReported: reportedOrder,
    filteredByStatus: status,
    startDate: fromDate,
    endDate: toDate,
    filteredByVendor: vendor,
  };

  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
    .join("&");

  if (vendor) {
    return requests.get<OrderResponse>(
      `/order/${userType}/orders?pageNumber=${page}&filterByVendor=${vendor}`
    );
  } else {
    return requests.get<OrderResponse>(
      `/order/${userType}/orders${queryString ? `?${queryString}` : ""}`
    );
  }
};

export const getOrder = ({ queryKey }: { queryKey: any }) => {
  const [_key, { id, userType, vendor }] = queryKey;
  return requests.get<Order>(`order/${userType}/order/${id}`);
};
