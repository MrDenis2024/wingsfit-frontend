import { createSlice } from "@reduxjs/toolkit";
import { createClientProfile, getClientProfile } from "./clientThunk.ts";
import { IClient } from "../../types/clientTypes.ts";
import { GlobalError } from "../../types/userTypes.ts";

interface ClientState {
  clientProfile: IClient | null;
  clientProfileError: GlobalError | null;
  clientProfileLoading: boolean;
  oneClientProfile: IClient | null;
  oneClientProfileLoading: boolean;
  creatingClientProfile: boolean;
}

const initialState: ClientState = {
  clientProfile: null,
  clientProfileError: null,
  clientProfileLoading: false,
  oneClientProfile: null,
  oneClientProfileLoading: false,
  creatingClientProfile: false,
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    resetClientError: (state) => {
      state.clientProfileError = null;
    },
  },
  selectors: {
    selectClientProfile: (state) => state.clientProfile,
    selectClientProfileLoading: (state) => state.clientProfileLoading,
    selectCreatingClientProfile: (state) => state.creatingClientProfile,
    selectClientProfileError: (state) => state.clientProfileError,
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
      .addCase(getClientProfile.rejected, (state, { payload: error }) => {
        state.clientProfileError = error || null;
        state.clientProfileLoading = false;
      });

    builder
      .addCase(createClientProfile.pending, (state) => {
        state.clientProfile = null;
        state.creatingClientProfile = true;
      })
      .addCase(
        createClientProfile.fulfilled,
        (state, { payload: clientProfile }) => {
          state.clientProfile = clientProfile;
          state.creatingClientProfile = false;
        },
      )
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
  selectClientProfileError,
} = clientSlice.selectors;

export const { resetClientError } = clientSlice.actions;
