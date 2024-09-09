"use client";

import { siteConfig } from "@/config/site.config";
import { AuthState, logoutUser } from "@/lib/redux/features/auth/authSlice";
import { makeStore } from "@/lib/redux/store";
import { BaseResponse } from "@/type/common";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import https from "https";
import { REHYDRATE } from "redux-persist";

const axiosInstance = axios.create({
  baseURL: `${siteConfig.apiURL}`,
  timeout: 500000,
  // withCredentials: true,
  // httpsAgent: new https.Agent({ rejectUnauthorized: false }),

  headers: {
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token if the user is authenticated
axiosInstance.interceptors.request.use(
  (config) => {
    const local = JSON.parse(localStorage.getItem("persist:root") as string);
    const auth = JSON.parse(local.auth) as AuthState;

    if (auth?.token) {
      config.headers["Authorization"] = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<BaseResponse<any>>) => {
    if (error.response?.status === 401) {
      // alert(error.response.data.message || "Unauthorized");

      toast.error(error.response.data.message || "Unauthorized");

      localStorage.clear();

      const { store } = makeStore();

      store.dispatch(logoutUser());

      store.dispatch({ type: REHYDRATE });

      window.location.href = `/${store.getState().auth.type}/login`;

      // You might want to redirect to login page or clear the auth state here
      // For example:
      // window.location.href = '/login';
      // or
      // store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) =>
    axiosInstance.get<BaseResponse<T>>(url).then(responseBody),

  post: <T>(url: string, body: {}, option?: any) =>
    axiosInstance.post<BaseResponse<T>>(url, body, option).then(responseBody),

  put: <T>(url: string, body: {}) =>
    axiosInstance.put<BaseResponse<T>>(url, body).then(responseBody),

  patch: <T>(url: string, body: {}) =>
    axiosInstance.patch<BaseResponse<T>>(url, body).then(responseBody),

  delete: <T>(url: string) =>
    axiosInstance.delete<BaseResponse<T>>(url).then(responseBody),
};

export default requests;
