import { createSlice } from "@reduxjs/toolkit";
import { getClientProfile } from "./clientThunk.ts";
import { IClientProfile } from "../../types/clientTypes.ts";

interface ClientState {
  clientProfile: IClientProfile | null;
  clientProfileLoading: boolean;
}

const initialState: ClientState = {
  clientProfile: null,
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
    builder
      .addCase(getClientProfile.pending, (state) => {
        state.clientProfileLoading = true;
      })
      .addCase(getClientProfile.fulfilled, (state, { payload: user }) => {
        state.clientProfile = user;
        state.clientProfileLoading = false;
      })
      .addCase(getClientProfile.rejected, (state) => {
        state.clientProfileLoading = false;
      });
  },
});

export const clientsReducer = clientSlice.reducer;

export const { selectClientProfile, selectClientProfileLoading } =
  clientSlice.selectors;
