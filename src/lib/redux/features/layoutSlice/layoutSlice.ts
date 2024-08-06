import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  adminSideBarOpen: false,
};
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleAdminSideBar: (state) => {
      state.adminSideBarOpen = !state.adminSideBarOpen;
    },
  },
});

export const { toggleAdminSideBar } = layoutSlice.actions;
export default layoutSlice.reducer;
