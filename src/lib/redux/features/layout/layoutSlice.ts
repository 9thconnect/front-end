import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  adminSideBarOpen: false,
  showTrackingModal: false,
};
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleAdminSideBar: (state) => {
      state.adminSideBarOpen = !state.adminSideBarOpen;
    },

    toggleTrackModal: (state, action: PayloadAction<{ open: boolean }>) => {
      state.showTrackingModal = action.payload.open;
    },
  },
});

export const { toggleAdminSideBar, toggleTrackModal } = layoutSlice.actions;
export default layoutSlice.reducer;
