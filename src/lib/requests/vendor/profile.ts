import { UserType } from "@/lib/redux/features/auth/authSlice";
import { ProductsResponse } from "@/type/common";
import { removeEmptyKeys } from "@/utils/clean-data";
import requests from "@/utils/requests";

export const updateProfile = (
  data: {
    fullName?: string;
    phoneNumber?: string;
    gender?: string;
    avatar?: string;
  },
  type: UserType
) => {
  if (type === UserType.CUSTOMER) {
    delete data.gender;
  }
  return requests.put(`/${type}/update-my-profile`, removeEmptyKeys(data));
};
