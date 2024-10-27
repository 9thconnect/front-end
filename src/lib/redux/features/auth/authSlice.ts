import { IAdmin, IUser, IVendor } from "@/type/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  data: IAdmin | IUser | IVendor | null;
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
  },
});

export const { storeAuthenticatedUser, logoutUser, updateAvatar } =
  authSlice.actions;

export default authSlice.reducer;
