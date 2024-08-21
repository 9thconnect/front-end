import { BaseResponse } from "@/type/common";
import { IAdmin } from "@/type/users";
import requests from "@/utils/requests";

interface LoginResponseData {
  token: string;
  admin: IAdmin;
}

export const loginAdmin = async (body: { email: string; password: string }) => {
  return requests.post<LoginResponseData>("/admin/auth/login", body);
};

export const addAdmin = async (adminData: {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}) => {
  return requests.post<IAdmin>("/admin/add-admin", adminData);
};

export const editAdmin = async (
  adminId: string,
  adminData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    role: string;
  }
) => {
  return requests.patch<null>(`/admin/edit-admin/${adminId}`, adminData);
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const body = { oldPassword, password: newPassword };
  return requests.patch<null>("/admin/change-password", body);
};
