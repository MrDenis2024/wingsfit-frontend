import { createSlice } from "@reduxjs/toolkit";
import { createClientProfile, getClientProfile } from "./clientThunk.ts";
import {IClientProfile} from "../../types/clientTypes.ts";

interface ClientState {
  clientProfile: IClientProfile | null;
  clientProfileLoading: boolean;
  oneClientProfile: IClientProfile | null;
  oneClientProfileLoading: boolean;
  creatingClientProfile: boolean;
}

const initialState: ClientState = {
  clientProfile: null,
  clientProfileLoading: false,
  oneClientProfile: null,
  oneClientProfileLoading: false,
  creatingClientProfile: false,
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  selectors: {
    selectClientProfile: (state) => state.clientProfile,
    selectClientProfileLoading: (state) => state.clientProfileLoading,
    selectCreatingClientProfile: (state) => state.creatingClientProfile,
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

    builder
      .addCase(createClientProfile.pending, (state) => {
        state.clientProfile = null;
        state.creatingClientProfile = true;
      })
      .addCase(createClientProfile.fulfilled, (state, { payload: clientProfile }) => {
        state.clientProfile = clientProfile;
        state.creatingClientProfile = false;
      })
      .addCase(createClientProfile.rejected, (state) => {
        state.creatingClientProfile = false;
      });
  },
});

export const clientsReducer = clientSlice.reducer;

export const {
  selectClientProfile,
  selectClientProfileLoading,
  selectCreatingClientProfile,
} = clientSlice.selectors;
