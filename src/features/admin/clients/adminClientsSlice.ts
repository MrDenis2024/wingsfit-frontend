import {Client} from "../../../types/clientTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAdminClients} from "./adminClientsThunks.ts";

export interface AdminClientsState {
  clients: Client[];
  totalClients: number;
  activeClients: number;
  clientsFetching: boolean;
}

const initialState: AdminClientsState = {
  clients: [],
  totalClients: 0,
  activeClients: 0,
  clientsFetching: false,
};

export const adminClientsSlice = createSlice({
  name: "adminClients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminClients.pending, (state) => {
        state.clientsFetching = true;
      })
      .addCase(fetchAdminClients.fulfilled, (state, { payload }) => {
        state.clientsFetching = false;
        state.totalClients = payload.totalClients;
        state.activeClients = payload.activeClients;
        state.clients = payload.clients;
      })
      .addCase(fetchAdminClients.rejected, (state) => {
        state.clientsFetching = false;
      });
  },
  selectors: {
    selectAdminClients: (state) => state.clients,
    selectAdminClientsFetching: (state) => state.clientsFetching,
    selectTotalClient: (state) => state.totalClients,
    selectActiveClient: (state) => state.activeClients,
  }
});

export const adminClientsReducer = adminClientsSlice.reducer;

export const {
  selectAdminClients,
  selectAdminClientsFetching,
  selectTotalClient,
  selectActiveClient
} = adminClientsSlice.selectors;
