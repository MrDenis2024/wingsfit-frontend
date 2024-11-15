import { createSlice } from "@reduxjs/toolkit";
import { getClientProfile } from "./clientThunk.ts";
import { IClientProfile } from "../../types/clientTypes.ts";

interface ClientState {
  clientProfile: IClientProfile | null;
  errorLoading: boolean;
  clientProfileLoading: boolean;
}

const initialState: ClientState = {
  clientProfile: null,
  errorLoading: false,
  clientProfileLoading: false,
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  selectors: {
    selectClientProfile: (state) => state.clientProfile,
    selectClientProfileLoading: (state) => state.clientProfileLoading,
  },
  extraReducers: (builder) => {
    builder.addCase(getClientProfile.pending, (state) => {
      state.clientProfileLoading = true;
    });
    builder.addCase(getClientProfile.fulfilled, (state, { payload: user }) => {
      state.clientProfileLoading = false;
      state.clientProfile = user;
    });
    builder.addCase(getClientProfile.rejected, (state) => {
      state.clientProfileLoading = false;
      state.errorLoading = true;
    });
  },
});

export const clientsReducer = clientSlice.reducer;

export const { selectClientProfile, selectClientProfileLoading } =
  clientSlice.selectors;
