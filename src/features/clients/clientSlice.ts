import { createSlice } from "@reduxjs/toolkit";
import { createClientProfile, getClientProfile } from "./clientThunk.ts";

export interface IClientProfile {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  gender: string;
  dateOfBirth: string;
  subscribes: string[];
  timeZone: string;
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}

interface ClientState {
  clientProfile: IClientProfile | null;
  errorLoading: boolean;
  clientProfileLoading: boolean;
  creatingClientProfile: boolean;
}

const initialState: ClientState = {
  clientProfile: null,
  errorLoading: false,
  clientProfileLoading: false,
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
    builder
      .addCase(createClientProfile.pending, (state) => {
        state.creatingClientProfile = true;
      })
      .addCase(createClientProfile.fulfilled, (state) => {
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
