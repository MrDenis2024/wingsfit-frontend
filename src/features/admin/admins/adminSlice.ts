import { GlobalError } from "../../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createAdmin } from "./adminThunks.ts";

export interface AdminsState {
  adminCreateLoading: boolean;
  adminCreateError: GlobalError | null;
}

const initialState: AdminsState = {
  adminCreateLoading: false,
  adminCreateError: null,
};

export const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state: AdminsState) => {
        state.adminCreateLoading = true;
        state.adminCreateError = null;
      })
      .addCase(createAdmin.fulfilled, (state: AdminsState) => {
        state.adminCreateLoading = false;
      })
      .addCase(
        createAdmin.rejected,
        (state: AdminsState, { payload: error }) => {
          state.adminCreateError = error || null;
          state.adminCreateLoading = false;
        },
      );
  },
  selectors: {
    selectAdminCreatLoading: (state: AdminsState) => state.adminCreateLoading,
    selectAdminCreatError: (state: AdminsState) => state.adminCreateError,
  },
});

export const adminsReducer = adminsSlice.reducer;
export const { selectAdminCreatLoading, selectAdminCreatError } =
  adminsSlice.selectors;
