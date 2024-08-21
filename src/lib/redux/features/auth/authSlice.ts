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
  },
});

export const { storeAuthenticatedUser } = authSlice.actions;

export default authSlice.reducer;
