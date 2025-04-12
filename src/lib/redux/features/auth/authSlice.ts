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

      console.log(state);
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.data?.avatar) {
        state.data.avatar = action.payload;
      }
    },
    updateBuildStatus: (state) => {
      const userData = state.data as IVendor;

      userData.profileBuild = true;
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

    updateUserProfile: (
      state,
      action: PayloadAction<{
        fullName: string;
        phoneNumber: string;
        gender: string;
      }>
    ) => {
      if (state.data) {
        const userData = state.data as IUser;
        userData.fullName = action.payload.fullName;
        userData.phoneNumber = action.payload.phoneNumber;
      }
    },
    updateVendorProfile: (
      state,
      action: PayloadAction<{
        fullName: string;
        phoneNumber: string;
        gender: string;
      }>
    ) => {
      if (state.data) {
        const userData = state.data as IVendor;
        userData.fullName = action.payload.fullName;
        userData.phoneNumber = action.payload.phoneNumber;
        userData.gender = action.payload.gender;
      }
    },
    updateSavedProducts: (
      state,
      action: PayloadAction<{ savedProduct: string; type: "add" | "remove" }>
    ) => {
      console.log("userData.savedProducts", action.payload.type);
      if (state.data) {
        const userData = state.data as IUser;

        console.log(
          "userData.savedProducts",
          userData.savedProducts.length,
          action.payload.type,
          action.payload.savedProduct
        );

        if (action.payload.type === "remove") {
          console.log("item removed");

          userData.savedProducts = userData.savedProducts.filter(
            (product) => product !== action.payload.savedProduct
          );

          console.log("userData.savedProducts", userData.savedProducts);

          return;
        }

        if (userData.savedProducts.includes(action.payload.savedProduct)) {
          return;
        }

        console.log("item added");

        userData.savedProducts.push(action.payload.savedProduct);

        console.log("userData.savedProducts", userData.savedProducts);
      }
    },

    updateVendor: (state, action: PayloadAction<IVendor>) => {
      if (state.type === UserType.VENDOR) {
        state.data = action.payload;
      }
    },
  },
});

export const {
  storeAuthenticatedUser,
  logoutUser,
  updateAvatar,
  updateAdminProfile,
  updateUserProfile,
  updateVendorProfile,
  updateBuildStatus,
  updateSavedProducts,
  updateVendor,
} = authSlice.actions;

export default authSlice.reducer;
