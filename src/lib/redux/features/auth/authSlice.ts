import { IAdmin, IUser, IVendor } from "@/type/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  data: IAdmin | IUser | IVendor | null | undefined;
  type: UserType;
  token: string | null;
}

export enum UserType {
  CUSTOMER = "customer",
  ADMIN = "admin",
  VENDOR = "vendor",
}

const initialState: AuthState = {
  data: null,
  type: UserType.CUSTOMER,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuthenticatedUser: (state, action: PayloadAction<AuthState>) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      console.log("calling");

      state.data = null;
      state.token = null;
      state.type = UserType.CUSTOMER;

      console.log(state);
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.data?.avatar) {
        state.data.avatar = action.payload;
      }
    },
    updateAdminProfile: (
      state,
      action: PayloadAction<{
        fullName: string;
        username: string;
        email: string;
        phone: string;
      }>
    ) => {
      if (state.data && state.type === UserType.ADMIN) {
        const adminData = state.data as IAdmin;
        adminData.fullName = action.payload.fullName;
        adminData.email = action.payload.email;
        adminData.username = action.payload.username;
        adminData.phone = action.payload.phone;
      }
    },
  },
});

export const {
  storeAuthenticatedUser,
  logoutUser,
  updateAvatar,
  updateAdminProfile,
} = authSlice.actions;

export default authSlice.reducer;
