import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { Admin } from "@/type/common";
import { IVendor } from "@/type/users";
import { removeEmptyKeys } from "@/utils/clean-data";
import requests from "@/utils/requests";

export const signUp = (data: VendorSignUpRequest, type: UserType) => {
  let cleanedData = removeEmptyKeys(data);

  if (type == UserType.CUSTOMER) {
    const { vendorType, ...rest } = cleanedData;
    cleanedData = rest;
  }

  console.log("form sign", cleanedData);

  return requests.post(`/${type}/auth/sign-up`, cleanedData);
};

export const resendVerificationCode = (email: string, type: UserType) => {
  return requests.post(`/${type}/auth/resend-verification-code/${email}`, {});
};

export const verifyAccount = (email: string, code: string, type: UserType) => {
  return requests.post(`/${type}/auth/-verify-account/${email}/${code}`, {});
};

export const forgotPassword = (email: string, type: UserType) => {
  return requests.post(`/${type}/auth/forget-password/${email}`, {});
};

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

export const resetPassword = (
  email: string,
  token: string,
  data: ResetPasswordRequest,
  type: UserType
) => {
  return requests.post(`/${type}/auth/reset-password/${email}/${token}`, data);
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = (data: LoginRequest, type: UserType) => {
  return requests.post<{ profile: IVendor; token: string; admin?: Admin }>(
    `/${type}/auth/login`,
    data
  );
};

export const logout = (type: UserType) => {
  return requests.post(`/${type}/auth/logout`, {});
};
