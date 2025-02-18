import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  adminSideBarOpen: false,
  showTrackingModal: false,
  showNotCustomerModal: false,
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

    toggleNotCustomerModal: (
      state,
      action: PayloadAction<{ open: boolean }>
    ) => {
      console.log("action", action.payload.open);

      state.showNotCustomerModal = action.payload.open;
    },
  },
});

export const { toggleAdminSideBar, toggleTrackModal, toggleNotCustomerModal } =
  layoutSlice.actions;
export default layoutSlice.reducer;
