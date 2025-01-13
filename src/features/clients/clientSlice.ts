import { createSlice } from "@reduxjs/toolkit";
import {
  createClientProfile,
  editClient,
  fetchClients,
  getClientProfile,
} from "./clientThunk.ts";
import { IClient } from "../../types/clientTypes.ts";
import { GlobalError } from "../../types/userTypes.ts";

interface ClientState {
  items: IClient[];
  itemsFetching: boolean;
  clientProfile: IClient | null;
  clientProfileError: GlobalError | null;
  clientProfileLoading: boolean;
  oneClientProfile: IClient | null;
  oneClientProfileLoading: boolean;
  creatingClientProfile: boolean;
  editClientLoading: boolean;
}

const initialState: ClientState = {
  items: [],
  itemsFetching: false,
  clientProfile: null,
  clientProfileError: null,
  clientProfileLoading: false,
  oneClientProfile: null,
  oneClientProfileLoading: false,
  creatingClientProfile: false,
  editClientLoading: false,
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
    selectClients: (state) => state.items,
    selectClientsFetching: (state) => state.itemsFetching,
    selectClientProfile: (state) => state.clientProfile,
    selectClientProfileLoading: (state) => state.clientProfileLoading,
    selectCreatingClientProfile: (state) => state.creatingClientProfile,
    selectClientProfileError: (state) => state.clientProfileError,
    selectEditClientLoading: (state) => state.editClientLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchClients.fulfilled, (state, { payload: clients }) => {
        state.itemsFetching = false;
        state.items = clients;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.itemsFetching = false;
      });
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

    builder
      .addCase(editClient.pending, (state) => {
        state.editClientLoading = true;
      })
      .addCase(editClient.fulfilled, (state) => {
        state.editClientLoading = false;
      })
      .addCase(editClient.rejected, (state) => {
        state.editClientLoading = false;
      });
  },
});

export const clientsReducer = clientSlice.reducer;

export const {
  selectClients,
  selectClientsFetching,
  selectClientProfile,
  selectClientProfileLoading,
  selectCreatingClientProfile,
  selectClientProfileError,
  selectEditClientLoading,
} = clientSlice.selectors;

export const { resetClientError } = clientSlice.actions;
